import os
from rembg import remove
from PIL import Image

image_dir = r"public\Opnsense\Foto's"

images_to_process = [
    "N150 intel Mini pc Hyper Visor Proxmox Firewall Router.png",
    "Ubuquit Switch.png",
    "Ubuquiti AccessPoint.png",
    "NUC Managment Mini PC.png",
    "Raspberry Pi 5 Pironman Max.jpg"
]

print("Starting background removal process...")
for filename in images_to_process:
    input_path = os.path.join(image_dir, filename)
    name, ext = os.path.splitext(filename)
    output_filename = f"{name}_transparent.png"
    output_path = os.path.join(image_dir, output_filename)
    
    if os.path.exists(input_path):
        print(f"Processing: {filename}")
        try:
            input_image = Image.open(input_path)
            output_image = remove(input_image)
            output_image.save(output_path, "PNG")
            print(f"Successfully saved to: {output_filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
    else:
        print(f"File not found: {input_path}")
        
print("All done!")
