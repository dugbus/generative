Hx = (function () {

  const _maxHue = 241

  // helpers
  function _getHSL(h, s = '97%', l = '62%') { return 'hsl(' + h + ', ' + s + ', ' + l + ')' }

  function _hexPoints(x, y, radius) {
    var points = []
    for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
      var pointX, pointY;

      pointX = Math.round(x + radius * Math.sin(theta))
      pointY = Math.round(y + radius * Math.cos(theta))

      points.push(pointX + "," + pointY)
    }

    return points.join(" ")
  }

  function Polygon() {
    var pointList = [];

    this.node = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    function build(arg) {
      var res = [];
      for (var i = 0, l = arg.length; i < l; i++) {
        res.push(arg[i].join(','));
      }
      return res.join(' ');
    }

    this.attribute = function (key, val) {
      if (val === undefined) return this.node.getAttribute(key);
      this.node.setAttribute(key, val);
    };

    this.getPoint = function (i) {
      return pointList[i]
    };

    this.setPoint = function (i, x, y) {
      pointList[i] = [x, y];
      this.attribute('points', build(pointList));
    };

    this.points = function () {
      for (var i = 0, l = arguments.length; i < l; i += 2) {
        pointList.push([arguments[i], arguments[i + 1]]);
      }
      this.attribute('points', build(pointList));
    };

    this.points.apply(this, arguments);
  }

  // creates and renders a map of hexes
  function _hexMap(radius, hue = 'undefined', cry = 'undefined') {

    const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

    const _hexs = []
    const _height = radius * 2
    const _width = Math.sqrt(3) * radius
    const _rows = Math.ceil(pageHeight / (_height * .75)) + 1
    const _cols = Math.ceil(pageWidth / _width) + 1

    function _getIndex(row, col) { return (row * _cols) + col }

    function _getNeighbours(row, col) {
      neighbours = []
      // even rows
      if (row % 2 == 0) {
        // upper neighbours
        if (row > 0) {
          neighbours.push(_getIndex(row - 1, col))           // always a top left
          if (col + 1 < _cols)
            neighbours.push(_getIndex(row - 1, col + 1))  // top right all but last
        }
        // lower neighbours
        if (row + 1 < _rows) {
          neighbours.push(_getIndex(row + 1, col))            // always a bottom left
          if (col + 1 < _cols)
            neighbours.push(_getIndex(row + 1, col + 1))  // bottom right all but last
        }
      }
      // odd rows
      else {
        // upper neighbours
        if (row > 0) {
          neighbours.push(_getIndex(row - 1, col))            // always a top right
          if (col > 0)
            neighbours.push(_getIndex(row - 1, col - 1))  // top left all but first
        }
        // lower neighbours
        if (row + 1 < _rows) {
          neighbours.push(_getIndex(row + 1, col))            // always a bottom right
          if (col > 0)
            neighbours.push(_getIndex(row + 1, col - 1))  // bottom left all but first
        }
      }
      // latteral neighbours
      if (col > 0) neighbours.push(_getIndex(row, col - 1))           // right
      if (col + 1 < _cols) neighbours.push(_getIndex(row, col + 1))  // left

      return neighbours
    }

    function _propogate(todo, range, multiplier = 1, delay = 0, up = true) {
      var next = todo

      todo.forEach(id => { _hexs[id].cry = up ? Math.min(_hexs[id].cry + multiplier, _maxHue - 1) : Math.max(_hexs[id].cry - multiplier, 0) })

      if (todo.length == 1) {
        let g0 = _hexs[todo[0]]
        g0.e.style.stroke = _getHSL(g0.hue)
      }

      if (--range > 0) {                                                // reduce range each cycle

        multiplier = multiplier > 1 ? multiplier - 1 : multiplier    // diminish multiplier each cycle

        // add new neighbours for next cycle
        todo.forEach(id => { _hexs[id].neibs.forEach(nid => { if (!next.includes(nid)) next.push(nid) }) })

        if (delay)
          window.setTimeout(() => _propogate(next, range, multiplier, delay, up), delay)
        else
          _propogate(next, range, multiplier, delay, up)
      }
    }

    function _bomb(range = 10, multiplier = 1, delay = 0) {
      targetHex = _hexs[Math.floor(Math.random() * _hexs.length)]
      _propogate([targetHex.id,], range, multiplier, delay, Math.random() < .5)
    }

    function _bombRR(maxRange = 10, multiplier = 1, delay = 0) {
      targetHex = _hexs[Math.floor(Math.random() * _hexs.length)]
      range = Math.ceil(Math.random() * maxRange)
      _propogate([targetHex.id,], range, multiplier, delay, Math.random() < .5)
    }

    function _carpetBombTargets(range, multiplier, delay, interval = 0) {
      if (interval > 0) window.setInterval(() => _bomb(range, multiplier, delay), interval)
    }

    function _carpetBombTargetsRR(maxRange, multiplier, delay, interval = 0) {
      if (interval > 0) window.setInterval(() => _bombRR(maxRange, multiplier, delay), interval)
    }

    function _refresh(repeat = 0) {

      _hexs.forEach(hex => {
        if (inc = (hex.hue < hex.cry) - (hex.hue > hex.cry)) hex.e.style.fill = _getHSL(hex.hue += inc)
        hex.e.style.stroke = '#000'
      })

      if (repeat > 0) window.setTimeout(() => _refresh(repeat), repeat)
    }

    // populate 
    for (row = 0; row < _rows; row++) {
      for (col = 0; col < _cols; col++) {
        let x = row % 2 ? (_width / 2) + (col * (_width + 1)) : _width + (col * (_width + 1))
        let y = row == 0 ? _height / 2 : (_height / 2) + (row * (_height + 1) * .75)
        _hexs.push({
          "r": row,
          "c": col,
          "x": x,
          "y": y,
          "id": _getIndex(row, col),
          'neibs': _getNeighbours(row, col),
          "hue": hue === 'undefined' ? Math.floor(Math.random() * _maxHue) : hue,
          'cry': cry === 'undefined' ? Math.floor(Math.random() * _maxHue) : cry
        })
      }
    }
    // console.log(_hexs)

    // add and size the svg 
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.id = 'hexMap'
    svg.style.position = 'absolute'
    svg.style.height = (pageHeight + 1.5 * _height) + "px"
    svg.style.width = (pageWidth + _width) + "px"
    svg.style.position = "absolute"
    svg.style.top = -.75 * _height + "px"
    svg.style.left = -.5 * _width + "px"

    // create add and render the hexagons
    _hexs.forEach(hex => {
      var pg = new Polygon(_hexPoints(hex.x, hex.y, radius))
      pg.node.id = '_' + hex.id
      pg.attribute('style', 'stroke-width: 2px; stroke: black; fill: ' + _getHSL(hex.hue))
      svg.appendChild(pg.node)
      hex.e = pg.node
    })

    document.body.appendChild(svg)

    map = {}

    map.refresh = (repeat = 0) => { _refresh(repeat); return map; }
    map.carpetBombTargets = (range, multiplier, delay, interval = 0) => { _carpetBombTargets(range, multiplier, delay, interval); return map; }
    map.carpetBombTargetsRR = (maxRange, multiplier, delay, interval = 0) => { _carpetBombTargetsRR(maxRange, multiplier, delay, interval = 0); return map; }

    return map
  }


  var me = {}

  me.Map = _hexMap

  return me
}())