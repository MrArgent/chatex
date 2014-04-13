var gr = {
  bp : '', // префикс пути
  f : 'system', // поле информации
  d : 'result', // поле информации
  // получение данных в формате Json
  prepareJsonData : function(d) {
    if (typeof(d[gr.f]) == 'undefined') {
      alert(d);
      return;
    }
    if (d[gr.f]['text']) {
      gr.msg.draw(d[gr.f]);

    }
    return d[gr.d];
  },
  // получение данных в текстововм формате
  prepareData : function(d) {
    try {
      eval('var d = ' + d);
    } catch(e) {
      alert(d);
      return;
    }
    return gr.prepareJsonData(d);
  },
  go : function(u, d, f) {
    if (typeof(f) == 'undefined') f = gr.prepareData;
    $.post(gr.bp + u, d, f);
  },
  msg : {
    m : {'text' : 'Empty msg', 'code' : 0},
    msg_place : '#msg_place',
    show : function(m, n) {
      gr.msg.m['text'] = m;
      if (n) gr.msg.m['code'] = 1;
      console.log(gr.msg.m);
      gr.msg.draw();
    },
    draw : function(m, n) {
        if (typeof(m) == 'undefined') m = gr.msg.m;
        $(this.msg_place).find('div.alert').removeClass('alert-success').removeClass('alert-error').addClass(m.code ? 'alert-success' : 'alert-error').text(m.text)
        $(this.msg_place).show(200);
        if (typeof(n) == 'undefined') setTimeout(gr.msg.hide, 5000);
    },
    hide : function() {
        $(this.msg_place).hide(500);
    },
    set : function(t, c) {
      if (typeof(c) == 'undefined') c = 0;
      gr.msg.draw({'text' : t, 'code' : c});
    }
  }
};