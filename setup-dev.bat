@echo off
echo Setting up DBZ Battle Simulator Development Environment...
echo.

echo Setting up Frontend...
cd frontend
call npm install
echo Frontend setup complete!
echo.

echo Setting up Backend...
cd ..\backend
pip install -r requirements.txt
python manage.py migrate
echo Backend setup complete!
echo.

echo Development environment ready!
echo.
echo To start the frontend: cd frontend && npm run dev
echo To start the backend: cd backend && python manage.py runserver
echo.
pause
