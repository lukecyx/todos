variable "region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "eu-west-1"
}

variable "ses_email_sender" {
  description = "The email address to send emails with ses"
  type        = string
}

variable "ses_domain_identity" {
  description = "The name of the domain"
  type        = string
}

