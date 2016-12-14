fis.match('widget/js/*.js',{
	//fis-optimizer-uglify-js插件进行压缩
	optimizer:fis.plugin('uglify-js')
});

fis.match('widget/js/*.png',{
	//fis-optimizer-png-compressor插件进行压缩
	optimizer:fis.plugin('png-compressor')
});