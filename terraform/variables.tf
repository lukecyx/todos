variable "region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "eu-west-1"
}

variable "ses_email_sender" {
  description = "The email address to send emails with ses"
  type        = string
}

variable "domain_name" {
  description = "The name of the domain"
  type        = string
}

variable "project" {
  description = "The name of the project"
  type        = string
}

variable "billing_alarm_email" {
  description = "The email address to receive the billing alarm alerts"
  type        = string
}
