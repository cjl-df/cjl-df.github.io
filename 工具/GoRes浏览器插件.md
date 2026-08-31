# GoRes 使用指导文档

# 什么是 GoRes

GoRes 是一款 Chrome 浏览器扩展，属于开发者工具类插件。它的核心功能是**将网页的远程资源请求重定向到本地文件或其他 URL**，从而在不修改服务器代码的情况下，实时调试和替换网页中的 JS、CSS、HTML、JSON 等资源。

GoRes 的设计灵感来源于 ReRes 和 Fiddler，是一款轻量级的 URL 重定向工具。它采用独立弹窗式界面，**不依赖 DevTools**，后台常驻运行，操作简单直观。

**核心用途：**本地 JS 替换远程 CDN 脚本、调试线上代码、逆向分析、绕过反调试、模拟接口返回、资源重定向等。

# 安装扩展

在 Chrome 应用商店中搜索 "GoRes"，点击添加至 Chrome 即可完成安装。安装后扩展会出现在浏览器右上角扩展列表中。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGY1Zjk4YmYxNmEyNjQ0Nzk2YTM3ZmUwNTQ2MTA4MDhfMTE4OTRlMDlmMWExOTE5YjAyZWU3YzE5ZTNiMmNmNjdfSUQ6NzY4MDE3MTExNzg1MTg4ODYyM18xNzg4MTc5NjA3OjE3ODgyNjYwMDdfVjM)

从商店页可以看到，GoRes 评分 3\.2 星，约 5,000 用户，属于"扩展程序"和"开发者工具"分类。扩展描述为："An URL redirect tool\. Learn from ReRes and Fiddler\."

## 安装后必做：开启文件访问权限

GoRes 需要读取本地磁盘文件来做资源替换，因此必须开启扩展的"允许访问文件网址"权限：

1. 打开 Chrome 扩展管理页（地址栏输入 `chrome://extensions/`）

2. 找到 GoRes，点击"详细信息"

3. 开启**"允许访问文件网址"**开关

未开启此权限时，规则可以填写和保存，但本地文件无法被加载，表现为"配置了规则但不生效"。这是最常见的踩坑点。

# 界面介绍

点击浏览器右上角的 GoRes 扩展图标，即可打开规则管理弹窗。界面主要分为规则列表和规则帮助两部分。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTlkNzA1MDYzYTI2Mjk4Nzk1ODhlYzEwMDI5OWEwYmVfYzNjZjc3MTkwMzU5MzMxYzYyZjIzZDg1ZDQ4ZDgzOWZfSUQ6NzY4MDE3MTExODI1ODU4ODYyOV8xNzg4MTc5NjA3OjE3ODgyNjYwMDdfVjM)

## 规则列表区域

规则列表是 GoRes 的核心操作区，每一行代表一条重定向规则，包含以下字段：

|字段|说明|操作|
|---|---|---|
|状态|规则的启用/禁用开关，蓝色为启用，灰色为禁用|点击开关切换|
|排序|规则的优先级顺序，数字越小优先级越高|上下箭头调整|
|类型|匹配模式：包含（黄色标签）、等于（绿色标签）、正则|下拉选择|
|匹配条件|用于匹配请求 URL 的字符串或正则表达式|文本输入|
|跳转目标地址|匹配成功后重定向到的目标 URL 或本地文件路径|文本输入|
|操作|删除规则|红色删除按钮|

界面顶部还提供**导入规则**、**导出规则**和**清空**按钮，支持规则的批量备份和迁移。

## 规则帮助区域

GoRes 界面下方内置了详细的规则帮助说明，涵盖三种匹配模式的定义和示例：

- **包含**：不区分大小写，请求网址包含条件字符串即可匹配

- **等于**：区分大小写，请求网址必须精确等于匹配条件

- **正则**：区分大小写，请求网址必须匹配正则表达式定义的模式

每种模式都配有可匹配和不可匹配的示例 URL，方便开发者快速理解和使用。

# 典型应用场景：CDN 资源加载失败

在国内开发环境中，经常遇到国外 CDN（如 Google CDN、cdnjs 等）加载超时或失败的情况，导致页面功能异常。GoRes 可以将失败的远程脚本重定向到本地文件，也可以替换为国内可用的 CDN 资源地址。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzQ3OTYxOWI3OWZkZmE1ZWI0ZDAxYzY5OWIxZTJmMzFfNDE0MWQxYzdjMzAyZTMyNjQzOTc0ZDhmNzliMWU3YjhfSUQ6NzY4MDE3MTEyMDQzMTM1MjgwNl8xNzg4MTc5NjA3OjE3ODgyNjYwMDdfVjM)

如上图所示，两个不同网站（Stack Overflow 和 JS Bin）都出现了 `jquery.min.js` 加载失败的问题，控制台报 `net:ERR_CONNECTION...` 错误，JS Bin 中进一步出现 `ReferenceError: $ is not defined`，说明 jQuery 未加载成功。

使用 GoRes 的解决方案：

1. 在本地准备一份可用的 jQuery 文件（如 `jquery-3.7.1.min.js`）

2. 打开 GoRes 弹窗，点击"新增规则"

3. 匹配类型选择"包含"，匹配条件填写 `jquery.min.js`

4. 跳转目标地址填写本地 jQuery 文件路径（如 `file:///C:/dev/js/jquery-3.7.1.min.js`）

5. 勾选启用规则

6. 刷新页面，jQuery 即可正常加载

## 方案二：替换为国内 CDN 地址

除了使用本地文件，还可以将失败的国外 CDN 资源重定向到国内可用的公共 CDN 地址。这种方式无需下载文件到本地，直接填写国内 CDN 的 URL 作为跳转目标即可，适合快速临时修复。

### 国内常用公共 CDN

以下是国内稳定可用的前端静态资源公共 CDN，按推荐程度排序：

|CDN 名称|官网地址|URL 格式示例|特点说明|
|---|---|---|---|
|**BootCDN**|https://www\.bootcdn\.cn/|https://cdn\.bootcdn\.net/ajax/libs/jquery/3\.7\.1/jquery\.min\.js|Bootstrap 中文网维护，资源丰富，稳定推荐|
|**Staticfile CDN**|https://www\.staticfile\.org/|https://cdn\.staticfile\.org/jquery/3\.7\.1/jquery\.min\.js|七牛云提供，国内稳定，资源齐全|
|**cdnjs\.net**|http://www\.cdnjs\.net/|https://cdnjs\.net/ajax/libs/jquery/3\.7\.1/jquery\.min\.js|阿里云 CDN 加速，每日同步 cdnjs\.com|
|**jsDelivr**|https://www\.jsdelivr\.com/|https://cdn\.jsdelivr\.net/npm/jquery@3\.7\.1/dist/jquery\.min\.js|国际 CDN，国内可访问，支持 npm/GitHub|
|**腾讯静态资源库**|https://libs\.qq\.com/|仅支持 jQuery、Zepto 等少数常用库|资源较少，仅覆盖最常用库|

**字节跳动静态资源公共库（cdn\.bytedance\.com）：**该服务曾因访问速度快而被广泛使用，但近期有消息称已全面下线或停止更新。使用前请先访问官网确认可用性，不建议作为长期依赖。

### 如何查询某个资源的国内 CDN 地址

当你需要将某个国外 CDN 资源替换为国内地址时，可以通过以下几种方法快速找到对应的国内 CDN 链接：

1. **官网搜索法（最准确）：**打开 BootCDN（https://www\.bootcdn\.cn/）或 Staticfile（https://www\.staticfile\.org/）官网，在顶部搜索框输入库名（如 `jquery`、`vue`、`lodash`），在搜索结果中选择需要的版本，点击对应文件（通常选 `.min.js` 压缩版），复制生成的 URL 即可。

2. **URL 规则拼接法（最快）：**如果已知库名和版本号，可以直接按 CDN 的 URL 格式拼接。BootCDN 格式为 `https://cdn.bootcdn.net/ajax/libs/库名/版本号/文件名`；Staticfile 格式为 `https://cdn.staticfile.org/库名/版本号/文件名`。例如 jQuery 3\.7\.1 的 BootCDN 地址就是 `https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js`。

3. **jsDelivr npm 查包法：**如果资源是 npm 包，可以用 jsDelivr 的 npm 源直接访问：`https://cdn.jsdelivr.net/npm/包名@版本号/文件路径`。例如 axios：`https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js`。访问 https://www\.jsdelivr\.com/ 可以搜索包名并浏览文件结构。

4. **搜索引擎法：**直接在搜索引擎中搜索 `资源名 国内CDN` 或 `资源名 bootcdn`，通常能直接找到可用的 CDN 链接。

### 实操示例：将 Google CDN 的 jQuery 替换为 BootCDN

假设页面引用了 Google CDN 的 jQuery 但加载失败：

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
```

操作步骤：

1. 访问 https://www\.bootcdn\.cn/，搜索 `jquery`

2. 选择版本 `3.7.1`，找到 `jquery.min.js`，复制链接：`https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js`

3. 打开 GoRes 弹窗，新增规则：匹配类型选"包含"，匹配条件填 `googleapis.com/ajax/libs/jquery`

4. 跳转目标地址粘贴刚才复制的 BootCDN 链接

5. 启用规则，刷新页面即可正常加载 jQuery

**小技巧：**用"包含"模式匹配国外 CDN 的域名特征（如 `googleapis.com`、`cdnjs.cloudflare.com`），可以一次性将该 CDN 下的所有同类资源重定向到国内地址，无需为每个文件单独建规则。但要注意确认目标国内 CDN 上有对应的资源版本。

# 基本使用步骤

## 标准操作流程

1. **安装扩展**：从 Chrome 应用商店安装 GoRes，并开启"允许访问文件网址"权限

2. **打开规则面板**：点击浏览器右上角的 GoRes 扩展图标，弹出规则管理窗口

3. **新增规则**：点击"新增规则"按钮，在列表中出现一行新规则

4. **选择匹配类型**：下拉选择"包含""等于"或"正则"

5. **填写匹配条件**：输入需要匹配的 URL 字符串或正则表达式

6. **填写跳转目标**：输入本地文件路径（`file:///...`）或其他目标 URL

7. **启用规则**：点击状态开关，确保规则处于启用状态（蓝色）

8. **刷新页面**：回到目标网页，按 `F5` 或 `Ctrl+R` 刷新即可生效

**GoRes 的优势：**不需要打开 F12 DevTools，不需要点击 Start Debug 按钮，规则保存后刷新页面即生效。扩展后台常驻，关闭弹窗后规则继续运行。

## 修改规则后的操作

GoRes 的规则修改是实时生效的，无需重启调试会话：

1. 直接在规则列表中修改匹配条件或跳转目标

2. 修改完成后点击页面空白处或按回车确认

3. 回到目标网页刷新即可看到效果

如果需要临时禁用某条规则，直接点击该行的状态开关即可，无需删除。

# 规则配置详解

## 匹配模式

GoRes 支持三种 URL 匹配模式：

|模式|说明|示例|
|---|---|---|
|包含|不区分大小写，URL 中包含指定字符串即可匹配|jquery\.min\.js|
|等于|区分大小写，URL 必须精确匹配完整地址|https://example\.com/js/app\.js|
|正则|区分大小写，使用正则表达式匹配 URL|^https?://\.\*\.js\($\|?\)|

## 常用正则表达式

```regex
# 匹配所有 http/https 站点的全部请求（慎用）
^https?://.*

# 匹配所有站点的 .js 文件（推荐）
^https?://.*\.js($|\?)

# 只匹配当前站点的全部请求
.*jsformat\.com.*

# 匹配所有 jquery 相关请求
.*jquery.*\.js($|\?)

# 匹配特定 CDN 域名
.*googleapis\.com.*

# $1,$2 自动替换（正则捕获组）
如：匹配规则 https://www.baidu.com/(.*)&(.*)
跳转：https://www.baidu.com/$1&$2
```

**不要直接使用 ****`.*`**** 作为全局匹配：**它会匹配 `chrome-extension://` 等扩展自身请求，可能导致浏览器异常。使用 `^https?://.*` 只匹配网页站点，更加安全。

## 本地文件路径格式

|操作系统|路径格式|示例|
|---|---|---|
|Windows|`file:///` \+ 盘符路径（正斜杠）|file:///C:/dev/js/test\.js|
|macOS|`file://` \+ 绝对路径|file:///Users/name/dev/test\.js|
|Linux|`file://` \+ 绝对路径|file:///home/user/dev/test\.js|

## 规则的导入与导出

GoRes 支持规则的批量导入导出，方便备份和在多台设备间迁移：

- **导出规则**：点击界面顶部的"导出规则"按钮，将当前所有规则保存为 JSON 文件

- **导入规则**：点击"导入规则"按钮，选择之前导出的 JSON 文件，规则将被批量添加

- **清空**：点击"清空"按钮可删除所有规则（操作前建议先导出备份）

# 常见问题排查

## 关闭扩展弹窗后还生效吗？

**生效。**GoRes 是后台常驻型扩展，规则保存在扩展本地存储中，由后台服务持续执行 URL 重定向。关闭弹窗只是隐藏了管理界面，**所有已启用的规则继续运行**，不受影响。

这与 GoRes2（必须保持 F12 DevTools 打开）有本质区别，也是 GoRes 的核心优势之一。

## 为什么规则不生效？

|现象|可能原因|解决方案|
|---|---|---|
|规则保存了但不执行|未开启"允许访问文件网址"权限|扩展管理页 → 详细信息 → 开启文件访问权限|
|规则状态为灰色|规则未启用|点击该行的状态开关，切换为蓝色启用状态|
|匹配条件写错|URL 不匹配（大小写、协议、路径）|用"包含"模式降低匹配精度，或核对目标 URL|
|本地文件路径错误|路径格式不正确或文件不存在|Windows 用 file:///C:/ 格式，确认文件真实存在|
|页面白屏或接口报错|全局规则匹配范围过大，替换了所有资源|缩小匹配范围，只匹配目标 JS 文件|
|替换后仍加载旧文件|浏览器缓存或 ServiceWorker 拦截|DevTools → Application → Service Workers → 勾选 Bypass for network，再硬刷新|
|与其他扩展冲突|多个请求拦截类扩展同时运行|禁用 ReRes、AdBlock 等可能冲突的扩展后重试|

## 不支持的页面

GoRes 只能作用于普通的 http/https 网页，以下页面**无法生效**：

- `chrome://`、`edge://` 等浏览器内置页面

- `file://` 本地文件页面

- Chrome 网上应用店页面

# GoRes vs ReRes 对比

GoRes 和 ReRes 都是 URL 重定向工具，功能相似。GoRes 在设计上学习了 ReRes 和 Fiddler 的经验。以下是两者的对比：

|对比项|GoRes|ReRes|
|---|---|---|
|运行依赖|后台常驻，关闭弹窗仍生效|后台常驻，关闭弹窗仍生效|
|入口位置|扩展图标弹窗|扩展图标弹窗|
|匹配模式|包含、等于、正则|包含、等于、正则|
|规则导入导出|支持 JSON 导入导出|支持 JSON 导入导出|
|规则分组|不支持|支持分组，批量启用/禁用|
|用户量|约 5,000|更多（老牌插件）|
|评分|3\.2 星|较高|
|界面特点|内置规则帮助说明，界面简洁|功能更丰富，规则分组管理|
|适合场景|轻量级重定向、规则数量适中|大量规则管理、需要分组切换|

**选择建议：**GoRes 界面简洁、内置帮助说明，适合规则数量不多、追求轻量的用户；如果你有大量规则需要分组管理和批量切换，ReRes 是更成熟的选择。两者都不依赖 F12，后台常驻运行。

# 正常页面参考

以下为资源正常加载时的 Stack Overflow 首页，可与前文 CDN 加载失败的场景做对比参考。当 GoRes 规则正确配置并生效后，页面应恢复到类似的正常状态。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjljNmU1NjQ1NTUzYmZkMTgyM2YxNGRiODkyYTk2NDNfZDhiM2NiOTY5MGFkOWFjZjVjMDM0MjAxOTYyMGZkZGJfSUQ6NzY4MDE3MTEyNTEyNDQwMjE0NV8xNzg4MTc5NjA3OjE3ODgyNjYwMDdfVjM)

# 总结

- GoRes 是轻量级 URL 重定向扩展，后台常驻运行，不依赖 F12 DevTools

- 安装后必须开启"允许访问文件网址"权限，否则本地文件无法加载

- 支持包含、等于、正则三种匹配模式，界面内置详细帮助说明

- 规则保存即生效，刷新页面即可看到替换效果，无需 Start Debug

- 关闭扩展弹窗后规则继续运行，不影响重定向

- 支持规则的 JSON 导入导出，方便备份和迁移

- 全局匹配使用 `^https?://.*`，不要用 `.*`

- 需要规则分组和批量管理时，可考虑改用 ReRes

> （注：部分内容可能由 AI 生成）
