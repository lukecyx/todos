resource "aws_budgets_budget" "budget_resources" {
  for_each     = local.aws_services
  name         = "${each.key} Monthly Budget"
  budget_type  = "COST"
  limit_amount = each.value.budget_limit
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  cost_filter {
    name = "Service"
    values = [
      each.value.name
    ]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.billing_alarm_email]
  }
}
