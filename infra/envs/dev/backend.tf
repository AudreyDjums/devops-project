terraform {
  backend "local" {
    path = "../../shared-state/dev.tfstate"
  }
}
