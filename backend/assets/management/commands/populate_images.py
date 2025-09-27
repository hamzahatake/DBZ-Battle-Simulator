from django.core.management.base import BaseCommand
from django.core.files import File
import os
from pathlib import Path
from assets.models import ImageAsset

class Command(BaseCommand):
    help = 'Populate ImageAsset model with existing images'

    def handle(self, *args, **options):
        media_path = Path('media/images')
        
        if not media_path.exists():
            self.stdout.write(self.style.ERROR('Media images directory not found'))
            return
        
        # Process profile images
        profile_path = media_path / 'profile'
        if profile_path.exists():
            self.process_directory(profile_path, 'character_profile')
        
        # Process full body images
        full_body_path = media_path / 'full_body'
        if full_body_path.exists():
            self.process_directory(full_body_path, 'character_full_body')
        
        # Process UI elements
        self.process_ui_elements(media_path)
        
        self.stdout.write(self.style.SUCCESS('Successfully populated image assets'))

    def process_directory(self, directory_path, category):
        """Process images in a directory and create ImageAsset objects"""
        for file_path in directory_path.iterdir():
            if file_path.is_file() and file_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp', '.avif']:
                # Extract character name from filename
                character_name = self.extract_character_name(file_path.stem)
                
                # Create ImageAsset
                asset, created = ImageAsset.objects.get_or_create(
                    name=file_path.stem,
                    defaults={
                        'category': category,
                        'character_name': character_name,
                        'description': f'{category.replace("_", " ").title()} image for {character_name}',
                        'is_active': True
                    }
                )
                
                if created:
                    # Set the image file
                    with open(file_path, 'rb') as f:
                        asset.image_file.save(file_path.name, File(f), save=True)
                    
                    self.stdout.write(f'Created asset: {asset.name}')

    def process_ui_elements(self, media_path):
        """Process UI elements and banners"""
        ui_files = [
            ('Attack.png', 'icon', 'Attack icon'),
            ('Defence.png', 'icon', 'Defense icon'),
            ('Auth.webp', 'banner', 'Authentication banner'),
            ('HeroCover1.jpg', 'banner', 'Hero section banner'),
            ('Plus.png', 'icon', 'Plus icon'),
            ('SearchBanner.webp', 'banner', 'Search banner'),
        ]
        
        for filename, category, description in ui_files:
            file_path = media_path / filename
            if file_path.exists():
                asset, created = ImageAsset.objects.get_or_create(
                    name=filename.split('.')[0],
                    defaults={
                        'category': category,
                        'description': description,
                        'is_active': True
                    }
                )
                
                if created:
                    with open(file_path, 'rb') as f:
                        asset.image_file.save(filename, File(f), save=True)
                    
                    self.stdout.write(f'Created UI asset: {asset.name}')

    def extract_character_name(self, filename):
        """Extract character name from filename"""
        # Remove common suffixes and clean up the name
        name = filename.replace('_', ' ').replace('-', ' ')
        
        # Handle specific cases
        if 'Goku' in name:
            if 'Black' in name and 'Rose' in name:
                return 'Goku Black Rose'
            elif 'Ultra' in name and 'Instinct' in name:
                return 'Goku Ultra Instinct'
            elif 'SSJ' in name:
                return 'Goku Super Saiyan'
            else:
                return 'Goku'
        elif 'Vegeta' in name:
            if 'Ultra' in name and 'Ego' in name:
                return 'Vegeta Ultra Ego'
            else:
                return 'Vegeta'
        elif 'Gohan' in name:
            if 'Beast' in name:
                return 'Gohan Beast'
            elif 'kid' in name.lower():
                return 'Kid Gohan'
            else:
                return 'Gohan'
        elif 'Cell' in name:
            if 'Max' in name:
                return 'Cell Max'
            else:
                return 'Cell'
        elif 'Buu' in name:
            return 'Kid Buu'
        elif 'Piccolo' in name:
            if 'Orange' in name:
                return 'Piccolo Orange'
            elif 'Fused' in name:
                return 'Piccolo Fused Namekian'
            else:
                return 'Piccolo'
        elif 'Frieza' in name:
            if 'Black' in name:
                return 'Frieza Black'
            else:
                return 'Frieza'
        
        return name.title()
