terraform {
  required_version = "= 1.5.7"

  backend "s3" {
    bucket  = "lukemartyn-tfstate"
    key     = "terraform.tfstate"
    region  = "eu-west-1"
    profile = "default"

  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.91.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }

    template = {
      source  = "hashicorp/template"
      version = "~> 2.2"
    }
  }
}

provider "aws" {
  region  = var.region
  profile = "default"

  default_tags {
    tags = {
      Project = var.project
    }
  }
}

provider "template" {}

provider "random" {}
