"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

interface Feature {
  id: string
  title: string
  content: string
}

interface FeaturesAccordionProps {
  features: Feature[]
  onFeaturesChange: (features: Feature[]) => void
}

export function FeaturesAccordion({ features, onFeaturesChange }: FeaturesAccordionProps) {
  const [editingFeature, setEditingFeature] = useState<string | null>(null)

  const addFeature = () => {
    const newFeature: Feature = {
      id: `feature-${Date.now()}`,
      title: "New Feature",
      content: "",
    }
    const updatedFeatures = [...features, newFeature]
    onFeaturesChange(updatedFeatures)
    setEditingFeature(newFeature.id)
  }

  const removeFeature = (featureId: string) => {
    const updatedFeatures = features.filter((feature) => feature.id !== featureId)
    onFeaturesChange(updatedFeatures)
    if (editingFeature === featureId) {
      setEditingFeature(null)
    }
  }

  const updateFeature = (featureId: string, field: keyof Feature, value: string) => {
    const updatedFeatures = features.map((feature) =>
      feature.id === featureId ? { ...feature, [field]: value } : feature,
    )
    onFeaturesChange(updatedFeatures)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Features</h1>
        <Button onClick={addFeature} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Add Feature
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {features.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No features added yet. Click "Add Feature" to get started.</p>
        ) : (
          features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-2 group">
              <span className="mt-1">•</span>
              <div className="flex-1 w-[70%]">
                {editingFeature === feature.id ? (
                  <div className="space-y-2">
                    <Input
                      value={feature.title}
                      onChange={(e) => updateFeature(feature.id, "title", e.target.value)}
                      placeholder="Feature title"
                      className="text-sm"
                    />
                    <Textarea
                      value={feature.content}
                      onChange={(e) => updateFeature(feature.id, "content", e.target.value)}
                      placeholder="Feature description"
                      className="text-sm"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setEditingFeature(null)}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingFeature(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="text-sm text-slate-700 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    onClick={() => setEditingFeature(feature.id)}
                  >
                    <div className="font-medium">{feature.title}</div>
                    {feature.content && <div className="text-xs text-gray-600 mt-1">{feature.content}</div>}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFeature(feature.id)}
                className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
