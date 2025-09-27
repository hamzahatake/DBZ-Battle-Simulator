from django.core.management.base import BaseCommand
from assets.models import ImageAsset

class Command(BaseCommand):
    help = 'Add a character with profile and full body images'

    def add_arguments(self, parser):
        parser.add_argument('character_name', type=str, help='Character name (exactly as in CHARACTER_DETAILS.md)')
        parser.add_argument('profile_image', type=str, help='Path to profile image file')
        parser.add_argument('full_body_image', type=str, help='Path to full body image file')
        parser.add_argument('--description', type=str, default='', help='Character description')

    def handle(self, *args, **options):
        character_name = options['character_name']
        profile_image_path = options['profile_image']
        full_body_image_path = options['full_body_image']
        description = options['description']

        try:
            # Add profile image
            profile_asset = ImageAsset.objects.create(
                name=f"{character_name}_Profile",
                category='character_profile',
                character_name=character_name,
                description=f"Profile image for {character_name}",
                is_active=True
            )
            
            with open(profile_image_path, 'rb') as f:
                profile_asset.image_file.save(f"{character_name}_Profile.jpg", f, save=True)
            
            self.stdout.write(
                self.style.SUCCESS(f'Successfully added profile image for {character_name}')
            )

            # Add full body image
            full_body_asset = ImageAsset.objects.create(
                name=f"{character_name}_FullBody",
                category='character_full_body',
                character_name=character_name,
                description=f"Full body image for {character_name}",
                is_active=True
            )
            
            with open(full_body_image_path, 'rb') as f:
                full_body_asset.image_file.save(f"{character_name}_FullBody.png", f, save=True)
            
            self.stdout.write(
                self.style.SUCCESS(f'Successfully added full body image for {character_name}')
            )

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error adding character {character_name}: {str(e)}')
            )
