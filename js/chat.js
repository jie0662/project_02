$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
        //为发送按钮绑定事件
    $('#iptbtn').on('click', function() {
            //输入栏的内容
            var text = $('#ipt').val().trim();
            //判断输入内容是否为空
            if (text.length <= 0) {
                $('#ipt').val('');
            }
            //如过输入内容不为空 用append 添加进聊天显示框 注意append不支持换行;
            $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
                //输入内容后输入框清空
            $('#ipt').val('');
            //初始化滚动条 
            resetui()
                //发起请求 获取回复聊天内容
            getMag(text)

        })
        //给输入栏绑定按回车发送消息 使用按键弹起触发事件
    $('#ipt').on('keyup', function(e) {
        //获取按键编码
        // console.log(e.keyCode);
        //当按键编码为13(回车键),触发 发送按钮自动点击事件;
        if (e.keyCode === 13) {
            $('#iptbtn').click();
        }
    })

    //发起请求获取聊天消息
    function getMag(text) {
        $.ajax({
            type: "GET",
            url: "http://www.liulongbin.top:3006/api/robot",
            data: { spoken: text },
            success: function(res) {
                if (res.message == 'success') {
                    //接收聊天消息
                    var msg = res.data.info.text;
                    //渲染到页面上
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
                        //初始化滚动条
                    resetui()
                        //调用语音函数,把文本转化为语音
                    getVoice(msg)
                }
            }
        });
    }
    //获取语音聊天消息
    function getVoice(text) {
        $.ajax({
            type: "GET",
            url: "http://www.liulongbin.top:3006/api/synthesize",
            data: {
                text: text
            },
            success: function(res) {
                console.log(res);
                if (res.status == 200) {
                    //播放语音 给video的src重新添加获取到的值
                    $('#video').attr('src', res.voiceUrl)

                }

            }
        });
    }
})