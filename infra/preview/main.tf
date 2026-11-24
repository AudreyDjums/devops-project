terraform {
  backend "local" {}

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.30"
    }
  }
}

variable "pr_number" {
  type = string
}

variable "image" {
  type = string
}

variable "container_port" {
  type = number
}

provider "kubernetes" {
  config_path    = pathexpand("~/.kube/config")
  config_context = "kind-devops-lab"
}

resource "kubernetes_namespace" "preview" {
  metadata {
    name = "pr-${var.pr_number}"
    labels = {
      purpose = "preview"
      pr      = var.pr_number
      owner   = var.owner
      expires = var.expires
    }
  }
}

resource "kubernetes_deployment" "app" {
  metadata {
    name      = "myapp"
    namespace = kubernetes_namespace.preview.metadata[0].name
  }

  spec {
    replicas = 1
    selector {
      match_labels = { app = "myapp" }
    }

    template {
      metadata {
        labels = { app = "myapp" }
      }

      spec {
        automount_service_account_token = false

        container {
          name              = "myapp"
          image             = var.image
          image_pull_policy = "IfNotPresent"

          port {
            container_port = var.container_port
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "app" {
  metadata {
    name      = "myapp"
    namespace = kubernetes_namespace.preview.metadata[0].name
  }

  spec {
    type     = "ClusterIP"
    selector = { app = "myapp" }

    port {
      name        = "http"
      port        = 80
      target_port = var.container_port
    }
  }
}

variable "owner" {
  type = string
}

variable "expires" {
  type = string
}
