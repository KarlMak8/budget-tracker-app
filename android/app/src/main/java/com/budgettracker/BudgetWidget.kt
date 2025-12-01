package com.budgettracker

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.SharedPreferences
import android.widget.RemoteViews
import android.graphics.Color

class BudgetWidget : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onEnabled(context: Context) {
        // Enter relevant functionality for when the first widget is created
    }

    override fun onDisabled(context: Context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}

internal fun updateAppWidget(
    context: Context,
    appWidgetManager: AppWidgetManager,
    appWidgetId: Int
) {
    val balance = getBalance(context)
    val views = RemoteViews(context.packageName, R.layout.budget_widget)
    
    // Update the balance text
    val formattedBalance = formatBalance(balance)
    views.setTextViewText(R.id.widget_balance, formattedBalance)
    
    // Set color based on positive/negative
    val balanceColor = if (balance >= 0) {
        Color.parseColor("#4ade80") // Green for positive
    } else {
        Color.parseColor("#f87171") // Red for negative
    }
    views.setTextColor(R.id.widget_balance, balanceColor)
    
    // Instruct the widget manager to update the widget
    appWidgetManager.updateAppWidget(appWidgetId, views)
}

private fun getBalance(context: Context): Double {
    val prefs: SharedPreferences = context.getSharedPreferences(
        "BudgetTrackerPrefs",
        Context.MODE_PRIVATE
    )
    val balanceString = prefs.getString("@widget_balance", "0.0")
    return balanceString?.toDoubleOrNull() ?: 0.0
}

private fun formatBalance(value: Double): String {
    val absValue = kotlin.math.abs(value)
    val formatted = String.format("%.2f", absValue)
    return if (value >= 0) "$$formatted" else "-$$formatted"
}
