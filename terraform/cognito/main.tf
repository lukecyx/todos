resource "aws_cognito_user_pool" "main_user_pool" {
  name = "${var.project}_user_pool"

  auto_verified_attributes = ["email"]

  schema {
    name                = "email"
    required            = true
    attribute_data_type = "String"
  }

  verification_message_template {
    email_message = "Your verification code is {####}"
    email_subject = "Verify your email for our app"
  }

  password_policy {
    minimum_length    = 10
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }
}

resource "aws_cognito_user_pool_client" "main_user_pool_client" {
  name         = "${var.project}_user_pool_client"
  user_pool_id = aws_cognito_user_pool.main_user_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]

  generate_secret = false
}

resource "aws_cognito_user_pool_domain" "main_user_pool_domain" {
  domain       = "myapp-myauth"
  user_pool_id = aws_cognito_user_pool.main_user_pool.id
}
