module "ses" {
  source              = "./ses"
  ses_email_sender    = var.ses_email_sender
  ses_domain_identity = var.ses_domain_identity
}
