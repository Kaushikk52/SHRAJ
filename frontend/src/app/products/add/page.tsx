"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, ChevronLeft, ChevronRight, Upload, Trash2 } from "lucide-react"
import { CustomTiptapEditor } from "@/components/custom-tiptap-editor"
import { FeaturesAccordion } from "@/components/features-accordian"
import Image from "next/image"
import Link from "next/link"

type TabType = "basic" | "table" | "features"

interface ProductTab {
  id: string
  name: string
  type: TabType
  content: string
  features?: Array<{ id: string; title: string; content: string }>
}

export default function ProductPostingPage() {
  const [productName, setProductName] = useState("")
  const [productBrand, setProductBrand] = useState("Shraj")
  const [productType, setProductType] = useState("")
  const [productImages, setProductImages] = useState<string[]>([])
  const [badges, setBadges] = useState<string[]>([])
  const [newBadge, setNewBadge] = useState("")
  const [showAddBadge, setShowAddBadge] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [tabs, setTabs] = useState<ProductTab[]>([
    {
      id: "description",
      name: "Description",
      type: "basic",
      content: "",
    },
    {
      id: "features",
      name: "Main Features",
      type: "features",
      content: "",
      features: [],
    },
  ])
  const [activeTab, setActiveTab] = useState("description")
  const [newTabName, setNewTabName] = useState("")
  const [newTabType, setNewTabType] = useState<TabType>("basic")
  const [showAddTab, setShowAddTab] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string)
            if (newImages.length === files.length) {
              setProductImages([...productImages, ...newImages])
            }
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (indexToRemove: number) => {
    setProductImages(productImages.filter((_, index) => index !== indexToRemove))
  }

  const addBadge = () => {
    if (newBadge.trim() && !badges.includes(newBadge.trim())) {
      setBadges([...badges, newBadge.trim()])
      setNewBadge("")
      setShowAddBadge(false)
    }
  }

  const removeBadge = (badgeToRemove: string) => {
    setBadges(badges.filter((badge) => badge !== badgeToRemove))
  }

  const addTab = () => {
    if (!newTabName.trim()) return

    const newTab: ProductTab = {
      id: `tab-${Date.now()}`,
      name: newTabName,
      type: newTabType,
      content: "",
      features: newTabType === "features" ? [] : undefined,
    }

    setTabs([...tabs, newTab])
    setActiveTab(newTab.id)
    setNewTabName("")
    setNewTabType("basic")
    setShowAddTab(false)
  }

  const removeTab = (tabId: string) => {
    if (tabs.length <= 1) return

    const updatedTabs = tabs.filter((tab) => tab.id !== tabId)
    setTabs(updatedTabs)

    if (activeTab === tabId) {
      setActiveTab(updatedTabs[0]?.id || "")
    }
  }

  const updateTabContent = (tabId: string, content: string) => {
    setTabs(tabs.map((tab) => (tab.id === tabId ? { ...tab, content } : tab)))
  }

  const updateTabFeatures = (tabId: string, features: Array<{ id: string; title: string; content: string }>) => {
    setTabs(tabs.map((tab) => (tab.id === tabId ? { ...tab, features } : tab)))
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      })
    }
  }

  const handleSaveProduct = () => {
    const productData = {
      name: productName,
      brand: productBrand,
      type: productType,
      images: productImages,
      badges: badges,
      tabs: tabs,
    }
    console.log("Product Data:", productData)
    alert("Product saved! Check console for data.")
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] max-w-7xl mx-auto gap-20 items-center justify-center mt-20">
        <div>
          {/* Product Images Upload Area */}
          <div className="space-y-4">
            {productImages.length > 0 ? (
              <div className="space-y-4">
                {/* Main Image */}
                <div className="w-full h-96 relative bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={productImages[0] || "/placeholder.svg"}
                    alt="Main product image"
                    fill
                    className="object-contain p-4"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeImage(0)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Additional Images */}
                {productImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {productImages.slice(1).map((image, index) => (
                      <div key={index + 1} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 2}`}
                          fill
                          className="object-contain p-2"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeImage(index + 1)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm mb-2">No images uploaded yet</p>
                  <p className="text-gray-400 text-xs">Click below to upload product images</p>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                {productImages.length > 0 ? "Add More Images" : "Upload Images"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 px-4 md:px-0">
          {/* Editable Product Title */}
          <div className="w-full">
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="text-4xl font-nunito font-semibold border-none p-0 h-auto bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ fontSize: "2.25rem", lineHeight: "2.5rem" }}
            />
          </div>

          {/* Product Badges */}
          <div className="w-full">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs">
                  {badge}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBadge(badge)}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {!showAddBadge ? (
                <Button variant="outline" size="sm" onClick={() => setShowAddBadge(true)} className="h-6 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Badge
                </Button>
              ) : (
                <div className="flex items-center gap-1">
                  <Input
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    placeholder="Badge text"
                    className="h-6 text-xs w-24"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addBadge()
                      if (e.key === "Escape") setShowAddBadge(false)
                    }}
                    autoFocus
                  />
                  <Button size="sm" onClick={addBadge} className="h-6 px-2 text-xs">
                    Add
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowAddBadge(false)} className="h-6 w-6 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            {badges.length === 0 && !showAddBadge && (
              <p className="text-xs text-gray-400">Add badges to highlight product features</p>
            )}
          </div>

          <div className="flex flex-col gap-10 w-full">
            {/* Dynamic Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="flex-1">
                  {tabs.map((tab) => (
                    <div key={tab.id} className="flex items-center">
                      <TabsTrigger value={tab.id} className="flex items-center gap-2">
                        {tab.name}
                        <span className="text-xs bg-muted px-1 rounded">{tab.type}</span>
                      </TabsTrigger>
                      {tabs.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTab(tab.id)}
                          className="ml-1 h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </TabsList>

                <div className="ml-4">
                  {!showAddTab ? (
                    <Button variant="outline" size="sm" onClick={() => setShowAddTab(true)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Tab
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Tab name"
                        value={newTabName}
                        onChange={(e) => setNewTabName(e.target.value)}
                        className="w-32"
                        onKeyDown={(e) => e.key === "Enter" && addTab()}
                      />
                      <Select value={newTabType} onValueChange={(value: TabType) => setNewTabType(value)}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="table">Table</SelectItem>
                          <SelectItem value="features">Features</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" onClick={addTab} disabled={!newTabName.trim()}>
                        Add
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setShowAddTab(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-4">
                  <div className="space-y-4">
                    <h1 className="border-b pb-2 text-xl font-semibold">{tab.name}</h1>

                    {tab.type === "features" ? (
                      <FeaturesAccordion
                        features={tab.features || []}
                        onFeaturesChange={(features) => updateTabFeatures(tab.id, features)}
                      />
                    ) : (
                      <CustomTiptapEditor
                        content={tab.content}
                        onChange={(content) => updateTabContent(tab.id, content)}
                        editorType={tab.type}
                      />
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Save Button */}
          <div className="w-full">
            <Button onClick={handleSaveProduct} size="lg" className="w-full">
              Save Product
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
