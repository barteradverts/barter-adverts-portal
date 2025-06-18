"use client"

import { useState } from "react"

interface ChartData {
  views: number[]
  inquiries: number[]
  deals: number[]
  revenue: number[]
  labels: string[]
}

interface AnalyticsChartProps {
  data: ChartData
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [activeMetric, setActiveMetric] = useState<keyof ChartData>("views")

  const metrics = [
    { key: "views" as const, label: "Views", color: "bg-blue-500" },
    { key: "inquiries" as const, label: "Inquiries", color: "bg-green-500" },
    { key: "deals" as const, label: "Deals", color: "bg-purple-500" },
    { key: "revenue" as const, label: "Revenue", color: "bg-orange-500" },
  ]

  const currentData = data[activeMetric]
  const maxValue = Math.max(...currentData)

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Performance Trends</h3>
        <div className="flex space-x-2">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                activeMetric === metric.key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {data.labels.map((label, index) => {
          const value = currentData[index]
          const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0
          const currentMetricData = metrics.find((m) => m.key === activeMetric)

          return (
            <div key={label} className="flex items-center space-x-4">
              <div className="w-16 text-sm text-gray-600">{label}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${currentMetricData?.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-16 text-sm font-medium text-right">
                {activeMetric === "revenue" ? `₹${value.toLocaleString()}` : value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
