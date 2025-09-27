Write-Host "Setting up DBZ Battle Simulator Development Environment..." -ForegroundColor Green
Write-Host ""

Write-Host "Setting up Frontend..." -ForegroundColor Yellow
Set-Location frontend
npm install
Write-Host "Frontend setup complete!" -ForegroundColor Green
Write-Host ""

Write-Host "Setting up Backend..." -ForegroundColor Yellow
Set-Location ..\backend
pip install -r requirements.txt
python manage.py migrate
Write-Host "Backend setup complete!" -ForegroundColor Green
Write-Host ""

Write-Host "Development environment ready!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the frontend: cd frontend && npm run dev" -ForegroundColor Cyan
Write-Host "To start the backend: cd backend && python manage.py runserver" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue"
