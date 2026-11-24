terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

resource "docker_image" "app" {
  name         = var.image
  keep_locally = true
}

resource "docker_container" "web" {
  name  = "tf-web-${var.env_name}"
  image = docker_image.app.image_id

  ports {
    internal = 80
    external = var.external_port
    ip       = "127.0.0.1"
  }
}