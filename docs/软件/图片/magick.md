
# magick
## 安装
点击https://imagemagick.org/script/download.php进入下载

## 常用命令
### 转换图片格式
```
magick input.jpg output.png
```
### 调整图片大小
```
magick input.png -resize 600x600 output.jpg
```
### 裁剪图像
```
magick input.jpg -crop 300x200+50+50 output.jpg
其中 300x200 是裁剪区域的尺寸，+50+50 是裁剪区域的起始位置。
```

### 创建缩略图
```
magick input.jpg -thumbnail 100x100 output.jpg
```
### 合并图像：
```
magick image1.jpg image2.jpg +append output.jpg 左右合并
magick image1.jpg image2.jpg -append output.jpg 上下合并
```
### 转换颜色空间
```
magick 01.png -colorspace Gray output.jpg
```
### 创建gif动画
```
magick -delay 50 -loop 0 *.png output.gif
```
### 压缩 GIF
```
magick input.gif -fuzz 1% -resize 600x600 -coalesce -layers Optimize  output.gif
```
- -fuzz : 颜色器
- -resize：图片尺寸
- -colorspace Gray：将颜色空间转换为灰度。
- -coalesce：合并连续的透明或相同像素的帧。
- -layers Optimize：优化 GIF 的图层，减少颜色数量和帧数。
### 查看图片信息
```
magick identify tiger.jpg
```
输出如下
```
tiger.jpg JPEG 1280x853 1280x853+0+0 8-bit sRGB 279261B 0.000u 0:00.000
```
- tiger.webp:文件名。
- JPEG:图像格式（JPEG）。
- 1280x853:图像的维度，宽度为800像素，高度为400像素。
- 1280x853+0+0:图像维度和偏移量。
- 1280x853 表示图像的宽度和高度。
- +0+0 表示图像的偏移量（起始点位置），在这里表示没有偏移（从左上角开始）。
- 8-bit:每个颜色通道的位深度（这里是8位）。
- sRGB:图像的颜色空间（标准RGB颜色空间）。
- 279261B:图像文件的大小（字节），这里是279261字节（约279KB）。
- 0.000u:用户CPU时间（以秒为单位），即处理图像所花费的CPU时间。
- 0:00.000:真实时间（以分钟和秒为单位），即处理图像所花费的实际时间
### 批量操作
```
magick mogrify -path ./out -resize 600x600 -format jpg -quality 85 -compress Zip *.png
```
