function indeed_get_conv_url(label, redirect, script) {
  var w = window;
  var proto = w.location.protocol.toLowerCase();
  if ('http:' != proto && 'https:' != proto) {
    proto = 'http:';
  }
  var url = proto + '//conv.indeed.com' +
      '/pagead/conv/' + escape(w.indeed_conversion_id) +
      '/?rand=' + (new Date()).getTime();
  if (w.indeed_conversion_value) {
    url = url + '&value=' + escape(w.indeed_conversion_value);
  }
  if (label) {
    url = url + '&channel=' + escape(label);
  }
  if (w.indeed_conversion_count > 1) {
    url = url + '&count=' + w.indeed_conversion_count;
  }
  if (w.indeed_conversion_applied) {
    url = url + "&applyComplete=" + w.indeed_conversion_applied;
  }
  if (w.indeed_conversion_hired) {
    url = url + "&hired=" + w.indeed_conversion_hired;
  }
  if (w.indeed_conversion_candidate_id) {
    url = url + "&candidateId=" + w.indeed_conversion_candidate_id;
  }
  if (w.indeed_conversion_step) {
    url = url + "&step=" + w.indeed_conversion_step;
  }
  url = url + '&script=' + (script ? script : 0);
  if (redirect) {
      url = url + "&url=" + escape(redirect);
  }
  if (w.indeed_conversion_ia) {
      url = url + "&ia=1";
  }
  return url;
}

function indeed_send_conversion_ping(url) {
  var convImage = indeed_create_conv_image(url, true);

  document.body.appendChild(convImage);
}

function indeed_create_conv_image(url, opt_iframe) {
  var convImage = document.createElement('img');
  convImage.setAttribute('height', '1');
  convImage.setAttribute('width', '1');
  convImage.setAttribute('border', '0');
  convImage.setAttribute('src', url + (opt_iframe ? '&iframe=0' : ''));
  convImage.setAttribute('style', 'display:none;');

  return convImage;
}

function indeed_handle_conversion() {
  var w = window;
  if (w.indeed_conversion_count) {
    w.indeed_conversion_count = w.indeed_conversion_count + 1;
  } else {
    w.indeed_conversion_count = 1;
  }
  if (w.indeed_conversion_id) {
    var url = indeed_get_conv_url(w.indeed_conversion_label, "", 1);

    indeed_send_conversion_ping(url);
  }
  w.indeed_conversion_id = null;
  w.indeed_conversion_value = null;
  w.indeed_conversion_label = null;
  w.indeed_conversion_ia = null;
  w.indeed_conversion_applied = null;
  w.indeed_conversion_hired = null;
  w.indeed_conversion_candidate_id = null;
  w.indeed_conversion_step = null;
}
