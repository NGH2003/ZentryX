# Update Existing GitHub Repository

## Quick Commands to Update Your Existing Repository:

```powershell
# Add your existing repository as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# If you get "remote origin already exists", remove it first:
# git remote remove origin
# Then add again

# Pull existing code (if any) - use --allow-unrelated-histories if needed
git pull origin main --allow-unrelated-histories
# Or if your branch is 'master':
git pull origin master --allow-unrelated-histories

# Push your code
git push -u origin master
# Or if your remote branch is 'main':
git branch -M main
git push -u origin main
```

## Step-by-Step:

### 1. Add Remote Repository
Replace `YOUR_USERNAME` and `YOUR_REPO_NAME`:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 2. Check Remote
```powershell
git remote -v
```

### 3. Push to GitHub
```powershell
git push -u origin master --force
```

**⚠️ Use `--force` only if you want to overwrite the remote repository with your local version!**

## If Your Default Branch is 'main':

```powershell
git branch -M main
git push -u origin main --force
```
