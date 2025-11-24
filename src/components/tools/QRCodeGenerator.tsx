import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, Link, Contact, Wifi, MessageSquare, Mail, Phone, MapPin, Calendar, QrCode, Barcode } from "lucide-react";

const QRCodeGenerator = () => {
  const [codeType, setCodeType] = useState("qr");
  const [qrType, setQrType] = useState("text");
  const [barcodeType, setBarcodeType] = useState("code128");
  const [inputText, setInputText] = useState("");
  const [url, setUrl] = useState("");
  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
    organization: ""
  });
  const [wifiData, setWifiData] = useState({
    ssid: "",
    password: "",
    security: "WPA",
    hidden: false
  });
  const [smsData, setSmsData] = useState({
    phone: "",
    message: ""
  });
  const [emailData, setEmailData] = useState({
    email: "",
    subject: "",
    body: ""
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    query: ""
  });
  const [eventData, setEventData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    description: ""
  });
  const [barcodeData, setBarcodeData] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [barcodeUrl, setBarcodeUrl] = useState("");
  const [size, setSize] = useState(200);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [logo, setLogo] = useState<string | null>(null);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [margin, setMargin] = useState(1);
  const [barcodeHeight, setBarcodeHeight] = useState(100);
  const [barcodeWidth, setBarcodeWidth] = useState(200);
  const { toast } = useToast();

  const qrTypes = {
    "Basic": [
      { id: "text", name: "Text", icon: "📝" },
      { id: "url", name: "URL", icon: <Link className="w-4 h-4" /> }
    ],
    "Contact & Communication": [
      { id: "contact", name: "Contact", icon: <Contact className="w-4 h-4" /> },
      { id: "email", name: "Email", icon: <Mail className="w-4 h-4" /> },
      { id: "phone", name: "Phone", icon: <Phone className="w-4 h-4" /> },
      { id: "sms", name: "SMS", icon: <MessageSquare className="w-4 h-4" /> }
    ],
    "Network & Location": [
      { id: "wifi", name: "WiFi", icon: <Wifi className="w-4 h-4" /> },
      { id: "location", name: "Location", icon: <MapPin className="w-4 h-4" /> }
    ],
    "Events": [
      { id: "event", name: "Event", icon: <Calendar className="w-4 h-4" /> }
    ]
  };

  const barcodeTypes = [
    { id: "code128", name: "Code 128", description: "High-density barcode (alphanumeric)" },
    { id: "code39", name: "Code 39", description: "Standard barcode (alphanumeric)" },
    { id: "ean13", name: "EAN-13", description: "13-digit product barcode" },
    { id: "ean8", name: "EAN-8", description: "8-digit product barcode" },
    { id: "upc", name: "UPC-A", description: "12-digit product barcode" }
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
        toast({
          title: "Logo uploaded!",
          description: "Logo will be embedded in the QR code"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateQRData = () => {
    switch (qrType) {
      case "text":
        return inputText;
      case "url":
        return url;
      case "contact":
        return `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
TEL:${contactData.phone}
EMAIL:${contactData.email}
ORG:${contactData.organization}
END:VCARD`;
      case "wifi":
        return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden};`;
      case "sms":
        return `SMSTO:${smsData.phone}:${smsData.message}`;
      case "email":
        return `mailto:${emailData.email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
      case "phone":
        return `tel:${phoneNumber}`;
      case "location":
        if (locationData.query) {
          return `geo:0,0?q=${encodeURIComponent(locationData.query)}`;
        } else {
          return `geo:${locationData.latitude},${locationData.longitude}`;
        }
      case "event":
        const formatDate = (dateStr: string) => {
          if (!dateStr) return "";
          return new Date(dateStr).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        return `BEGIN:VEVENT
SUMMARY:${eventData.title}
DTSTART:${formatDate(eventData.startDate)}
DTEND:${formatDate(eventData.endDate)}
LOCATION:${eventData.location}
DESCRIPTION:${eventData.description}
END:VEVENT`;
      default:
        return inputText;
    }
  };

  const generateQRCode = () => {
    const data = generateQRData();
    
    if (!data.trim()) {
      toast({
        title: "Error",
        description: "Please enter some data",
        variant: "destructive"
      });
      return;
    }

    // Using QR Server API with advanced options
    const encodedData = encodeURIComponent(data);
    const foregroundHex = foregroundColor.replace('#', '');
    const backgroundHex = backgroundColor.replace('#', '');
    
    let qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}&ecc=${errorCorrection}&margin=${margin}&color=${foregroundHex}&bgcolor=${backgroundHex}`;
    
    setQrCodeUrl(qrUrl);
    
    toast({
      title: "Generated!",
      description: "QR code generated successfully"
    });
  };

  const generateBarcode = () => {
    if (!barcodeData.trim()) {
      toast({
        title: "Error",
        description: "Please enter data for the barcode",
        variant: "destructive"
      });
      return;
    }

    // Validate data based on barcode type
    const validateBarcodeData = () => {
      switch (barcodeType) {
        case "ean13":
          return /^\d{13}$/.test(barcodeData);
        case "ean8":
          return /^\d{8}$/.test(barcodeData);
        case "upc":
          return /^\d{12}$/.test(barcodeData);
        case "code39":
          return /^[A-Z0-9\-. $\/+%]*$/.test(barcodeData);
        case "code128":
          return true; // Code128 accepts most characters
        default:
          return true;
      }
    };

    if (!validateBarcodeData()) {
      toast({
        title: "Invalid Data",
        description: `Please enter valid data for ${barcodeTypes.find(t => t.id === barcodeType)?.name}`,
        variant: "destructive"
      });
      return;
    }

    // Using a barcode API service
    const encodedData = encodeURIComponent(barcodeData);
    const barcodeApiUrl = `https://bwipjs-api.metafloor.com/?bcid=${barcodeType}&text=${encodedData}&scale=3&height=${barcodeHeight/10}&includetext`;
    
    setBarcodeUrl(barcodeApiUrl);
    
    toast({
      title: "Generated!",
      description: "Barcode generated successfully"
    });
  };

  const generateCode = () => {
    if (codeType === "qr") {
      generateQRCode();
    } else {
      generateBarcode();
    }
  };

  const downloadCode = () => {
    const url = codeType === "qr" ? qrCodeUrl : barcodeUrl;
    if (!url) return;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${codeType === "qr" ? "qrcode" : "barcode"}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded!",
      description: `${codeType === "qr" ? "QR code" : "Barcode"} downloaded successfully`
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">QR Code & Barcode Generator</CardTitle>
          <CardDescription>
            Generate customizable QR codes and barcodes for various purposes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Code Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-4">Choose Code Type:</label>
            <RadioGroup value={codeType} onValueChange={setCodeType} className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="qr" id="qr" />
                <label htmlFor="qr" className="flex items-center space-x-2 cursor-pointer">
                  <QrCode className="w-5 h-5" />
                  <span>QR Code</span>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="barcode" id="barcode" />
                <label htmlFor="barcode" className="flex items-center space-x-2 cursor-pointer">
                  <Barcode className="w-5 h-5" />
                  <span>Barcode</span>
                </label>
              </div>
            </RadioGroup>
          </div>

          {codeType === "qr" && (
            <>
              {/* QR Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-4">QR Code Type:</label>
                <div className="space-y-4">
                  {Object.entries(qrTypes).map(([category, types]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {types.map((type) => (
                          <Button
                            key={type.id}
                            variant={qrType === type.id ? "default" : "outline"}
                            onClick={() => setQrType(type.id)}
                            className="justify-start h-auto p-3"
                            size="sm"
                          >
                            <span className="mr-2">{type.icon}</span>
                            {type.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Content Input - keep existing code for all QR types */}
              {qrType === "text" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Text:</label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="min-h-32"
                  />
                </div>
              )}

              {qrType === "url" && (
                <div>
                  <label className="block text-sm font-medium mb-2">URL:</label>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    type="url"
                  />
                </div>
              )}

              {/* ... keep existing code for all other QR types (contact, wifi, sms, email, phone, location, event) */}
              {qrType === "contact" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name:</label>
                      <Input
                        value={contactData.name}
                        onChange={(e) => setContactData({...contactData, name: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone:</label>
                      <Input
                        value={contactData.phone}
                        onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                        placeholder="+1234567890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email:</label>
                      <Input
                        value={contactData.email}
                        onChange={(e) => setContactData({...contactData, email: e.target.value})}
                        placeholder="john@example.com"
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization:</label>
                      <Input
                        value={contactData.organization}
                        onChange={(e) => setContactData({...contactData, organization: e.target.value})}
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                </div>
              )}

              {qrType === "wifi" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">WiFi Information:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Network Name (SSID):</label>
                      <Input
                        value={wifiData.ssid}
                        onChange={(e) => setWifiData({...wifiData, ssid: e.target.value})}
                        placeholder="MyWiFiNetwork"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password:</label>
                      <Input
                        value={wifiData.password}
                        onChange={(e) => setWifiData({...wifiData, password: e.target.value})}
                        placeholder="Enter WiFi password"
                        type="password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Security Type:</label>
                      <select
                        value={wifiData.security}
                        onChange={(e) => setWifiData({...wifiData, security: e.target.value})}
                        className="w-full p-2 border rounded"
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">None</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="hidden-network"
                        checked={wifiData.hidden}
                        onChange={(e) => setWifiData({...wifiData, hidden: e.target.checked})}
                      />
                      <label htmlFor="hidden-network" className="text-sm">
                        Hidden Network
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {qrType === "sms" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Information:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number:</label>
                      <Input
                        value={smsData.phone}
                        onChange={(e) => setSmsData({...smsData, phone: e.target.value})}
                        placeholder="+1234567890"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Message:</label>
                      <Textarea
                        value={smsData.message}
                        onChange={(e) => setSmsData({...smsData, message: e.target.value})}
                        placeholder="Enter your message..."
                        className="min-h-20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {qrType === "email" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Information:</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address:</label>
                      <Input
                        value={emailData.email}
                        onChange={(e) => setEmailData({...emailData, email: e.target.value})}
                        placeholder="recipient@example.com"
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject:</label>
                      <Input
                        value={emailData.subject}
                        onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                        placeholder="Email subject"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message Body:</label>
                      <Textarea
                        value={emailData.body}
                        onChange={(e) => setEmailData({...emailData, body: e.target.value})}
                        placeholder="Enter your message..."
                        className="min-h-20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {qrType === "phone" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number:</label>
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
              )}

              {qrType === "location" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Location Information:</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Search Query (e.g., "Pizza near me"):</label>
                      <Input
                        value={locationData.query}
                        onChange={(e) => setLocationData({...locationData, query: e.target.value})}
                        placeholder="Enter location or search query"
                      />
                    </div>
                    <div className="text-center text-sm text-gray-500">OR</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Latitude:</label>
                        <Input
                          value={locationData.latitude}
                          onChange={(e) => setLocationData({...locationData, latitude: e.target.value})}
                          placeholder="40.7128"
                          type="number"
                          step="any"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Longitude:</label>
                        <Input
                          value={locationData.longitude}
                          onChange={(e) => setLocationData({...locationData, longitude: e.target.value})}
                          placeholder="-74.0060"
                          type="number"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {qrType === "event" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event Information:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Event Title:</label>
                      <Input
                        value={eventData.title}
                        onChange={(e) => setEventData({...eventData, title: e.target.value})}
                        placeholder="Meeting with John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date & Time:</label>
                      <Input
                        value={eventData.startDate}
                        onChange={(e) => setEventData({...eventData, startDate: e.target.value})}
                        type="datetime-local"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Date & Time:</label>
                      <Input
                        value={eventData.endDate}
                        onChange={(e) => setEventData({...eventData, endDate: e.target.value})}
                        type="datetime-local"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Location:</label>
                      <Input
                        value={eventData.location}
                        onChange={(e) => setEventData({...eventData, location: e.target.value})}
                        placeholder="Conference Room A"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Description:</label>
                      <Textarea
                        value={eventData.description}
                        onChange={(e) => setEventData({...eventData, description: e.target.value})}
                        placeholder="Event description..."
                        className="min-h-20"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {codeType === "barcode" && (
            <>
              {/* Barcode Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Barcode Type:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {barcodeTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={barcodeType === type.id ? "default" : "outline"}
                      onClick={() => setBarcodeType(type.id)}
                      className="justify-start h-auto p-4 text-left"
                    >
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Barcode Data Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Barcode Data:
                  {barcodeType === "ean13" && " (13 digits)"}
                  {barcodeType === "ean8" && " (8 digits)"}
                  {barcodeType === "upc" && " (12 digits)"}
                </label>
                <Input
                  value={barcodeData}
                  onChange={(e) => setBarcodeData(e.target.value)}
                  placeholder={
                    barcodeType === "ean13" ? "1234567890123" :
                    barcodeType === "ean8" ? "12345678" :
                    barcodeType === "upc" ? "123456789012" :
                    "Enter your data here"
                  }
                />
                {barcodeType === "code39" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Supports A-Z, 0-9, and symbols: - . $ / + % space
                  </p>
                )}
              </div>

              {/* Barcode Customization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Width: {barcodeWidth}px
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="400"
                    value={barcodeWidth}
                    onChange={(e) => setBarcodeWidth(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Height: {barcodeHeight}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={barcodeHeight}
                    onChange={(e) => setBarcodeHeight(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </>
          )}

          {/* QR Code Customization Options (only for QR codes) */}
          {codeType === "qr" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Size and Error Correction */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Size: {size}x{size} pixels
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Error Correction:</label>
                  <select
                    value={errorCorrection}
                    onChange={(e) => setErrorCorrection(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Margin: {margin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={margin}
                    onChange={(e) => setMargin(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Foreground Color:</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Background Color:</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Logo (Optional):</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    {logo && (
                      <div className="flex items-center justify-between text-sm text-green-600">
                        <span>✓ Logo uploaded</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setLogo(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button onClick={generateCode} className="w-full">
            Generate {codeType === "qr" ? "QR Code" : "Barcode"}
          </Button>

          {/* Display Generated Code */}
          {(qrCodeUrl || barcodeUrl) && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src={codeType === "qr" ? qrCodeUrl : barcodeUrl} 
                    alt={`Generated ${codeType === "qr" ? "QR Code" : "Barcode"}`}
                    className="border border-gray-300 rounded-lg"
                  />
                  {logo && codeType === "qr" && (
                    <img
                      src={logo}
                      alt="Logo overlay"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded"
                    />
                  )}
                </div>
              </div>
              <Button onClick={downloadCode} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download {codeType === "qr" ? "QR Code" : "Barcode"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-lg">{codeType === "qr" ? "QR Code" : "Barcode"} Tips</CardTitle>
        </CardHeader>
        <CardContent>
          {codeType === "qr" ? (
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Higher error correction allows for more damage but creates denser codes</li>
              <li>Use high contrast colors for better scanning reliability</li>
              <li>Test your QR codes with different devices before printing</li>
              <li>Keep URLs short for cleaner QR codes</li>
              <li>WiFi QR codes allow instant network connection on most devices</li>
              <li>Contact QR codes automatically add information to address books</li>
              <li>Location QR codes can open maps or search for places</li>
            </ul>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>EAN and UPC codes are commonly used for retail products</li>
              <li>Code 128 offers high data density and supports full ASCII</li>
              <li>Code 39 is widely supported but less dense than Code 128</li>
              <li>Ensure sufficient contrast between bars and background</li>
              <li>Test barcodes with your scanning equipment before printing</li>
              <li>Maintain proper quiet zones (margins) around barcodes</li>
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
