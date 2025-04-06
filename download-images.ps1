$images = @{
    'hero/hero-bg.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=1920&q=80'
    'hero/page-hero-bg.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=1920&q=80'
    'products/chips-packet.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'products/multi-layer-films.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'products/barrier-films.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'products/laminated-films.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'industries/tea-industry.jpg' = 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?w=800&q=80'
    'industries/snacks-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/wafers-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/confectionary-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/flour-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/sugar-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/rice-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/tobacco-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/pulses-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/cereals-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/sea-foods-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/salt-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/seeds-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/motor-parts-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/cosmetics-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/cement-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'industries/incense-sticks-industry.jpg' = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=800&q=80'
    'machinery/extrusion-line.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'machinery/lamination-machine.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'machinery/printing-machine.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'machinery/slitting-machine.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'infrastructure/production-unit.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'infrastructure/warehouse.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'infrastructure/rd-center.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
    'infrastructure/office-complex.jpg' = 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?w=800&q=80'
}

foreach ($image in $images.GetEnumerator()) {
    $url = $image.Value
    $path = "images/$($image.Key)"
    Invoke-WebRequest -Uri $url -OutFile $path
    Write-Host "Downloaded: $path"
} 