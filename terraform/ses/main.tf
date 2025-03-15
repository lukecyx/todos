resource "aws_ses_email_identity" "ses_sender_email" {
  email = var.ses_email_sender
}


resource "aws_iam_role" "ses_sender_iam_role" {
  name = "ses_send_email_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ses.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_policy" "ses_send_email_role" {
  name        = "ses_send_email_policy"
  description = "Policy to allow sending emails via SES"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ],
        "Resource" : "*"
      }
    ]
  })
}


resource "aws_ses_domain_identity" "ses_domain_identity" {
  domain = var.ses_domain_identity
}

resource "aws_ses_domain_dkim" "domain_dkim" {
  domain = aws_ses_domain_identity.ses_domain_identity.domain
}


resource "aws_route53_record" "verification_record" {
  zone_id = "Z00248011W6UYXHISXLHS"
  name    = "_amazonses.${aws_ses_domain_identity.ses_domain_identity.domain}"
  type    = "TXT"
  ttl     = "600"
  records = [aws_ses_domain_identity.ses_domain_identity.verification_token]
}

resource "aws_ses_domain_identity_verification" "domain_verification" {
  domain     = aws_ses_domain_identity.ses_domain_identity.domain
  depends_on = [aws_route53_record.verification_record]
}

resource "aws_route53_record" "dkim_record" {
  zone_id = "Z00248011W6UYXHISXLHS"
  count   = 3
  name    = "${aws_ses_domain_dkim.domain_dkim.dkim_tokens[count.index]}._domainkey.${var.ses_domain_identity}"
  type    = "CNAME"
  ttl     = "600"
  records = ["${aws_ses_domain_dkim.domain_dkim.dkim_tokens[count.index]}.dkim.amazonses.com"]

}
