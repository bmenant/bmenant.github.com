/**
 * typo-fixer.js - copyright @bmenant 2011
 * MIT License
 */

(function ()
{
	var $all_p, $all_abbr, $c,
			_d, _cl_quot_marks, _op_quot_marks, _punct_marks, _re_all_marks, _re_punct_marks, _re_op_quot_marks, _re_cl_quot_marks,
			parseNodesRecursively;
	// Get elements to fixe
	$c        = document.getElementById('contenu'),
	$all_p    = $c.getElementsByTagName('p'),
	$all_abbr = $c.getElementsByTagName('abbr'),
	_cl_quot_marks    = '\\)\\]\\}»›',
	_op_quot_marks    = '‹«\\(\\[\\{',
	_punct_marks      = '!?;:',
	_token            = '<§>',
	_re_punct_marks   = new RegExp('([' + _punct_marks + '])', 'gm'),
	_re_cl_quot_marks = new RegExp('([' + _cl_quot_marks + '])', 'gm'),
	_re_op_quot_marks = new RegExp('([' + _op_quot_marks + '])', 'gm'),
	_re_all_marks     = new RegExp('([' + _punct_marks + _op_quot_marks + _cl_quot_marks + '])', 'gm'),
	parseNodesRecursively = function ($parent)
	{
		var $newChildren = '';

		for (var $child, $clone, $tmpElt, _split_text, _i = 0; _i < $parent.childNodes.length; _i++)
		{
			$child = $parent.childNodes[_i];

			// Check a text node
			if ($child.nodeType === $child.TEXT_NODE)
			{
				_split_text = $child.nodeValue
										// Isolate quotation and tall punctuation marks
										. replace(_re_all_marks, _token + '$1' + _token)
										. split(_token);

				// Process each text node's portion
				for (var _text, _class, _html, _j = 0; _j < _split_text.length; _j++)
				{
					_text = _split_text[_j];

					// Search for quotation or tall punctuation marks
					if (_re_punct_marks.test(_text) === true)
					{
						_class = 'typo-ph';
					}
					else if (_re_op_quot_marks.test(_text) === true)
					{
						_class = 'typo-go';
					}
					else if (_re_cl_quot_marks.test(_text) === true)
					{
						_class = 'typo-gf';
					}
					else
					{
						_class = null;
					}

					// Add markups for quotation or tall punctuation marks
					_html = _class
								? '<span class="' + _class + '">' + _text + '</span>'
								: _text;

					// Concat HTML string node to others
					$newChildren += _html;
				}
			}
			else
			{
				// Clone element
				$clone  = $child.cloneNode(false),
				$tmpElt = document.createElement('div');
				$tmpElt.appendChild($clone);

				// Parse children (recursivity)
				if ($child.hasChildNodes() === true)
				{
					$clone.innerHTML = parseNodesRecursively($child);
				}

				// Concat HTML string node to others
				$newChildren += $tmpElt.innerHTML,
				$tmpElt = $clone = null;
			}
		}

		return $newChildren;
	};

	// Fixe content's paragraphes…
	for (var $p, _html, _i = 0; _i < $all_p.length; _i++)
	{
		$p = $all_p[_i];

		if ($p.parentNode === $c.firstChild)
		{
			_html = parseNodesRecursively($p);
			$p.innerHTML = _html;
		}
	}

	// Add thin unbreakable spaces between dots and letters into abbreviations
	for (var $abbr, _text, _i = 0; _i < $all_abbr.length; _i++)
	{
		$abbr = $all_abbr[_i],
		_text	= $abbr.innerHTML
					. replace(/\./g, '<span>.</span>');

		$abbr.innerHTML = _text;
	}
})();
