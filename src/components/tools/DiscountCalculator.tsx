import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Percent } from "lucide-react";

const DiscountCalculator = () => {
    const [originalPrice, setOriginalPrice] = useState<number>(100);
    const [discountPercent, setDiscountPercent] = useState<number>(20);
    const [finalPrice, setFinalPrice] = useState<number>(80);
    const [savings, setSavings] = useState<number>(20);

    useEffect(() => {
        const discountAmount = (originalPrice * discountPercent) / 100;
        const final = originalPrice - discountAmount;
        setSavings(discountAmount);
        setFinalPrice(final);
    }, [originalPrice, discountPercent]);

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Calculate Discount</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Original Price</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    id="price"
                                    type="number"
                                    value={originalPrice}
                                    onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="discount">Discount Percentage</Label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    id="discount"
                                    type="number"
                                    value={discountPercent}
                                    onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <div className="grid grid-cols-3 gap-2">
                                {[5, 10, 15, 20, 25, 50].map((pct) => (
                                    <Button
                                        key={pct}
                                        variant={discountPercent === pct ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setDiscountPercent(pct)}
                                    >
                                        {pct}%
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                    <CardHeader>
                        <CardTitle className="text-green-800">Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-sm text-green-600 font-medium mb-1">Final Price</div>
                            <div className="text-5xl font-bold text-green-700">
                                ${finalPrice.toFixed(2)}
                            </div>
                        </div>

                        <div className="p-4 bg-white/60 rounded-lg border border-green-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Original Price:</span>
                                <span className="font-medium text-gray-900 line-through">${originalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-green-600 font-medium">You Save:</span>
                                <span className="font-bold text-green-700">${savings.toFixed(2)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DiscountCalculator;
