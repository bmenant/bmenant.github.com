/**
 * copyright @bmenant 2011
 * MIT License
 */

(function ()
{
  /**
   * Event objet util
   */
  var Evt = new Object;
  /**
   * Add event listener
   *
   * @param {Element}   $target   The element to listen
   * @param {String}    _evtType  The standard event type ('click'… etc.)
   * @param {Function}  fnHandmer The function handler to call when event occurs
   */
  Evt.add = function ($target, _evtType, fnHandler)
  {
    if ($target.addEventListener)
    {
      $target.addEventListener(_evtType, fnHandler, false);
    }
    else if ($target.attachEvent)
    {
      $target.attachEvent('on' + _evtType, fnHandler);
    }
  };

  // Get elements and do the thing!
  window.setTimeout(function ()
  {
    var $item_a_propos  = document.getElementById('item-a-propos'),
        $goto_a_propos  = $item_a_propos.firstChild,
        $exit_a_propos  = document.getElementById('exit-a-propos'),
        $a_propos       = document.getElementById('footer'),
        exit_a_propos,
        goto_a_propos,
        $show_sources = document.getElementById('show-sources'),
        $sources      = document.getElementById('sources'),
        $a_sources    = !$sources || $sources.getElementsByTagName('a'),
        show_sources,
        $show_comments      = document.getElementById('showcomments'),
        $show_comments_bis  = document.getElementById('showcomments-bis'),
        $comments           = document.getElementById('commentaires'),
        $disqus_script      = document.getElementById('disqus_script'),
        show_comments,
        check_hash;

    // Footer
    exit_a_propos = function ()
    {
      $item_a_propos.className = $a_propos.className = '';
    },
    goto_a_propos = function ()
    {
      $item_a_propos.className = $a_propos.className = 'active';
    };
    Evt.add($goto_a_propos, 'click', goto_a_propos);
    Evt.add($exit_a_propos, 'click', exit_a_propos);

    // Sources
    if ($show_sources)
    {
      show_sources = function ()
      {
        $show_sources.className = $sources.className = 'active';
      };
      Evt.add($show_sources, 'click', show_sources);
      for (var _i = 0, $s = $a_sources[_i]; _i < $a_sources.length; _i++)
      {
        Evt.add($s, 'focus', show_sources);
      }
    }

    // Comments
    if ($show_comments) {
      show_comments = function ()
      {
        $show_comments.parentNode.className += $comments.className = ' active';
        $disqus_script.src                   = 'http://' + disqus_shortname + '.disqus.com/embed.js';
      };
      Evt.add($show_comments, 'click', show_comments);
      Evt.add($show_comments_bis, 'click', show_comments);
    }


    /**
     * Do some stuff for usability
     */
    check_hash = function ()
    {
      var _location_hash = document.location.hash;

      // Footer
      if (_location_hash === '#a-propos')
      {
        goto_a_propos();
      }
      // Sources
      else if (_location_hash === '#sources')
      {
        show_sources();
      }
      // Comments
      else if (_location_hash.substr(1, 7) === 'comment')
      {
        show_comments();
      }
    };
    // Do it at loading
    check_hash();
    // Redo it anytime the URL changes
    if (window.Modernizr.hashchange == true)
    {
      Evt.add(window, 'hashchange', check_hash);
    }

  }, 15);
})();
