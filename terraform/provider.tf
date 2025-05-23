terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.91.0"
    }
  }
  required_version = "= 1.5.7"
}

provider "aws" {
  region  = var.region
  profile = "default"
}
