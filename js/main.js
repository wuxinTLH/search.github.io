$("window").ready(function () {
    //#region 普通模块
    //延迟
    setTimeout(function () {
        setDefaultEngine();
        setDefaultLanguage();
        $("input#search").on('click', function () {
            setLocal("defaultEngine", $("#selector").val());
            window.location = list[$("#selector").val()] + encodeURIComponent($("#keyword").val());
        });
        document.onkeydown = function (e) {
            var keyNum = window.event ? e.keyCode : e.which;
            if (keyNum == 13) {
                if ($("#keyword").val() != "") {
                    setLocal("defaultEngine", $("#selector").val());
                    window.location = list[$("#selector").val()] + encodeURIComponent($("#keyword").val());
                }
            }
        }
    }, 1)
    var list = ["https://www.google.com/search?q=", "https://www.bing.com/search?q=",
        "https://www.baidu.com/s?ie=UTF-8&wd=", "https://github.com/search?q=",
        "https://search.bilibili.com/all?keyword="
    ];



    //#endregion
    //#region vue模块
    var defaultLang = getLocal("defaultLang");
    var language = [{
        0: "谷歌",
        1: "必应",
        2: "百度",
        3: "GitHub",
        4: "哔哩哔哩",
        5: "请输入搜索内容",
        6: "搜索"
    }, {
        0: "Google",
        1: "Bing",
        2: "Baidu",
        3: "GitHub",
        4: "Bilibili",
        5: "please input search keywards",
        6: "search"
    }, {
        0: "谷歌",
        1: "必应",
        2: "百度",
        3: "GitHub",
        4: "Bilibili",
        5: ""
    }];
    var titles = [{
        0: "进入我的直播间",
        1: "の搜索站点",
        2: "带记忆功能"
    }, {
        0: "enter my bilibili live room",
        1: "'s Search Site",
        2: "with memory"
    }]
    const vue = new Vue({
        el: '.centerBox',
        data: {
            lang: language[defaultLang],
            title: titles[defaultLang]
        },
        methods: {
            setLang: function () {
                setLocal("defaultLang", $("#langBox").val());
                this.lang = language[$("#langBox").val()];
                this.title = titles[$("#langBox").val()];
            }
        }
    })
    //#endregion
})



//#region 封装方法
//获取键值对
function getLocal(key) {
    /**
     * key 所获取的键
     * 
     */
    if (window.localStorage.getItem(key)) {
        return window.localStorage.getItem(key);
    } else {
        return 0;
    }
}
//保存键值对
function setLocal(key, value) {
    /**
     * key 所存储键
     * value 所存储的值
     */
    window.localStorage.setItem(key, value);
}
//保存默认引擎
function setDefaultEngine() {
    var defaultEngine = getLocal("defaultEngine");
    var selector = $("#selector")[0];
    var opts = selector.querySelectorAll("option");
    for (var i = 0; i < opts.length; i++) {
        if (opts[i].value == defaultEngine) {
            opts[i].selected = true;
        }
    }
}
//保存默认语言
function setDefaultLanguage() {
    var defaultLang = getLocal("defaultLang");
    var langBox = $("#langBox")[0];
    var opts = langBox.querySelectorAll("option");
    for (var i = 0; i < opts.length; i++) {
        if (opts[i].value == defaultLang) {
            opts[i].selected = true;
        }
    }
}
//搜索按钮和回车事件监听
function setSearcher() {}
//#endregion