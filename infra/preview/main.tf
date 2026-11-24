terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.30"
    }
  }

  backend "local" {}

}



variable "pr_number" {
  type = string
}

variable "image" {
  type = string
}

provider "kubernetes" {
  config_path    = "C:/Users/laris/.kube/config"
  config_context = "kind-devops-lab"
}

resource "kubernetes_namespace" "preview" {
  metadata {
    name = "pr-${var.pr_number}"

    labels = {
      purpose = "preview"
      pr      = var.pr_number
      owner   = "audrey"
      expires = "2026-11-25"
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
      match_labels = {
        app = "myapp"
      }
    }

    template {
      metadata {
        labels = {
          app = "myapp"
        }
      }

      spec {
        container {
          name              = "myapp"
          image             = var.image
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 8080
          }

          security_context {
            privileged = true
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "app" {
  metadata {
    name      = "myapp-service"
    namespace = kubernetes_namespace.preview.metadata[0].name
  }

  spec {
    selector = {
      app = "myapp"
    }

    port {
      port        = 80
      target_port = 8080
    }

    type = "ClusterIP"
  }
}

