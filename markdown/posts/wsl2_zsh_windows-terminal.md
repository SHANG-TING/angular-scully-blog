---
title: 'WSL2, zsh, windows terminal'
tags: 
  - wsl
  - zsh
  - windows-terminal
description: 實作過程的紀錄 & 備忘錄
author: 謝尚庭 Neil
date: 2020/06/26
published: true
---


# WSL2, zsh, windows terminal

## 1 啟用 WSL
 
### 1.1 啟用 Windows 子系統 Linux 版

- 方法一
```shell=
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```
- 方法二
![](https://i.imgur.com/WeDRDg7.png)

## 2 升級到 WSL 2

**(PS.在開始前 你必須先將Win10更新到至少18917版)**

### 2.1 啟用虛擬機器功能

**以系統管理員開啟PowerShell**
輸入指令啟動虛擬機平台可選組件

- 方法一
```shell=
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

- 方法二
```shell=
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```
重新啟動您的電腦，以完成 WSL 安裝並更新至 WSL 2。

### 2.2 下載 Linux 核心更新套件

1. 下載最新套件
    - [WSL2 Linux 核心更新套件 (適用於 x64 電腦)](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
    > 如果您使用的是 ARM64 電腦，請改為下載 ARM64 套件。 如果您不確定您有何種類型的電腦，請開啟命令提示字元或 PowerShell，然後輸入：systeminfo | find "System Type"。
2. 請執行在上一個步驟中下載的更新套件。 (按兩下以執行 - 系統會提示您提供更高的權限，請選取 [是] 以核准此安裝作業。)

### 2.3 將 WSL 2 設定為預設版本

- 設定預設版本
    ```shell=
    wsl --set-default-version 2
    ```

- 指定 WSL Distro 升級到 WSL 2 版本
    ```shell=
    wsl --set-version <Distribution Name> 2
    ```
    > 接下來就等待系統轉換完成 需要一小段時間

- 列出目前已經安裝的 WSL Distro 版本（包含顯示執行狀態與 WSL 版本）
    ```shell=
    wsl -l -v
    ```
    > 若VERSION顯示2代表轉換成功

### 2.4 安裝您選擇的 Linux 發行版本

開啟 [Microsoft Store](https://aka.ms/wslstore)，然後選取您最愛的 Linux 發行版本。

安裝 [Ubuntu-20.04](https://www.microsoft.com/store/productId/9N6SVWS3RX71)
    
當您第一次啟動新安裝的 Linux 發行版本時，主控台視窗會隨即開啟，而系統會要求您等候一到兩分鐘，讓檔案解壓縮並儲存在您的電腦上。 未來的所有啟動時間都應該會低於一秒。

接著，您必須為新的 Linux 發行版本設定使用者帳戶和密碼。

## 3 調整 Shell 執行環境

### 3.1 建議先更新系統到最新版

```shell=
sudo apt update && sudo apt upgrade
```

### 3.2 要用 Git 版控，建議調整一下設定值
- 一定要設定 `user.name` 與 `user.email` 資訊（請自行調整內容）

```shell=
git config --global user.name Neil
git config --global user.email lightup.neil@gmail.com
```
- 常用設定（避免顯示亂碼）
```shell=
git config --global core.editor vim
git config --global core.autocrlf false
git config --global core.quotepath false
git config --global help.autocorrect 30
git config --global color.diff auto
git config --global color.status auto
git config --global color.branch auto
```
> 如果出現所有檔案都是編輯狀態的話，解決方案https://github.com/microsoft/WSL/issues/184#issuecomment-209913528

- 常用 alias 設定
```shell=
git config --global alias.ci   commit
git config --global alias.cm   "commit --amend -C HEAD"
git config --global alias.co   checkout
git config --global alias.st   status
git config --global alias.sts  "status -s"
git config --global alias.br   branch
git config --global alias.re   remote
git config --global alias.di   diff
git config --global alias.type "cat-file -t"
git config --global alias.dump "cat-file -p"
git config --global alias.lo   "log --oneline"
git config --global alias.ls   "log --show-signature"
git config --global alias.ll   "log --pretty=format:'%h %ad | %s%d [%Cgreen%an%Creset]' --graph --date=short"
git config --global alias.lg   "log --graph --pretty=format:'%Cred%h%Creset %ad |%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset [%Cgreen%an%Creset]' --abbrev-commit --date=short"
git config --global alias.alias "config --get-regexp ^alias\."
git config --global alias.ignore '!'"gi() { curl -sL https://www.gitignore.io/api/\$@ ;}; gi"
```

### 3.3 安裝Z Shell
```shell=
sudo apt-get install zsh
```
- 確認shell清單裡是否有zsh
    ```shell=
    cat /etc/shells
    ```
- 找出zsh的安裝位置
    ```shell=
    which zsh
    ```
- 預設 zsh
    ```shell=
    chsh -s $(which zsh)
    ```
    
### 3.4 安裝 oh-my-zsh
```shell=
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
    
### 3.5 安裝 PowerLevel10k 主題
- clone 主題
    ```shell=
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
    ```
- 修改 ~/.zshrc
    ```shell=
    ZSH_THEME="powerlevel10k/powerlevel10k"

    # To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
    [[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
    ```
- 激活 ~/.zshrc 設定
    ```shell=
    source ~/.zshrc
    ```
- p10k 設定
    ```shell=
    p10k configure
    ```
- 安裝字型
    - [MesloLGS NF Regular.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Regular.ttf)
    - [MesloLGS NF Bold.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold.ttf)
    - [MesloLGS NF Italic.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Italic.ttf)
    - [MesloLGS NF Bold Italic.ttf](https://github.com/romkatv/dotfiles-public/raw/master/.local/share/fonts/NerdFonts/MesloLGS%20NF%20Bold%20Italic.ttf)

- 設定終端機使用新字型
Windwos Terminal profiles.json 找到 wsl.exe 的設定後加上 fontFace 設定：
    ```json
    "fontFace": "MesloLGS NF"
    ```

### 3.6 安裝 dircolors

![](https://i.imgur.com/rzzsGxg.png)

選擇你想要的主題，並下載文件到你的主目錄。
```shell=
curl https://raw.githubusercontent.com/seebi/dircolors-solarized/master/dircolors.ansi-dark --output ~/.dircolors
```

在zsh配置文件的底部添加一行以使用剛剛下載的內容。
```shell=
# load dircolors
eval `dircolors ~/.dircolors`
```

### 3.7 安裝 Plugins of oh-my-zsh

#### Syntax Highlighting

![](https://i.imgur.com/Zj1sv4h.png)

 clone [Syntax Highlighting](https://github.com/zsh-users/zsh-syntax-highlighting.git) and source the script:
```shell=
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```


#### Auto Suggestions

![](https://i.imgur.com/VeBNqlU.png)

1. clone [Auto Suggestions](https://github.com/zsh-users/zsh-autosuggestions.git) 到 `$ZSH_CUSTOM/plugins` (預設 `~/.oh-my-zsh/custom/plugins`)

```shell=
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2. 將 Auto Suggestions Plugin 加到 Oh My Zsh 的 Plugin 列表中 (在 `~/.zshrc`):


```shell=
plugins=(zsh-autosuggestions)
```

3. 激活 ~/.zshrc 設定
```shell=
source ~/.zshrc
```

### 3.9 🔥 終端機 session 管理神器 — tmux

**請參閱 →** https://larrylu.blog/tmux-33a24e595fbc


## 4 安裝 windowsterminal-shell 工具

**PowerShell Scripts to Install/Uninstall Context Menu Items for Windows Terminal**

![](https://github.com/lextm/windowsterminal-shell/raw/master/default.png)

安裝方式請查看 [Readme.md](https://github.com/lextm/windowsterminal-shell/blob/master/Readme.md)

## 5 透過檔案總管存取到 WSL Distro 內部檔案

打開`檔案總管`並輸入以下路徑
```
\\wsl$
```
![](https://i.imgur.com/OQGEma5.png)


## 參考資料

- https://docs.microsoft.com/zh-tw/windows/wsl/install-win10
- https://blog.miniasp.com/post/2020/07/26/Multiple-Linux-Dev-Environment-build-on-WSL-2
- https://nickymeuleman.netlify.app/blog/linux-on-windows-wsl2-zsh-docker#change-integrated-vscode-terminal
- http://jdev.tw/blog/6093/wsl2-oh-my-zsh-install-and-setup#header-**1**
