# DBZ Battle Simulator - Backend

This is the Django REST API backend for the Dragon Ball Z Battle Simulator application.

## Features

- **Character Management**: CRUD operations for Dragon Ball Z characters
- **Battle System**: Simulate battles between characters with detailed turn-by-turn logs
- **User Authentication**: Secure user authentication and authorization
- **REST API**: Full REST API with Django REST Framework
- **Admin Interface**: Django admin interface for managing data

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Migrations**:
   ```bash
   python manage.py migrate
   ```

3. **Create Superuser** (optional):
   ```bash
   python manage.py createsuperuser
   ```

4. **Run Development Server**:
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/`

## API Endpoints

### Characters
- `GET /api/characters/` - List all characters
- `GET /api/characters/{id}/` - Get character details
- `GET /api/characters/stats/` - Get character statistics

### Battles
- `GET /api/battles/` - List user's battles
- `POST /api/battles/` - Create a new battle
- `GET /api/battles/{id}/` - Get battle details
- `GET /api/battles/{id}/history/` - Get battle turn history

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout

## Admin Interface

Access the Django admin interface at `http://localhost:8000/admin/`

Default superuser credentials:
- Username: `admin`
- Password: `admin123` (you'll need to set this)

## Project Structure

```
backend/
├── dbz_battle_simulator/     # Main Django project
├── characters/               # Character management app
├── battles/                 # Battle simulation app
├── users/                   # User management app
├── requirements.txt         # Python dependencies
└── manage.py               # Django management script
```

## Models

### Character
- Basic character information (name, description, images)
- Stats (attack, defense, health)
- Properties (race, transformation)

### Battle
- Battle between two characters
- Status tracking (pending, in_progress, completed)
- Battle logs and summary

### BattleTurn
- Individual turn in a battle
- Attack/defense details
- Health tracking

## Development

To add new features:

1. Create/modify models in the respective app
2. Create serializers for API responses
3. Create views for API endpoints
4. Update URL configurations
5. Run migrations: `python manage.py makemigrations && python manage.py migrate`
