/**
 * core/Game.ts
 *
 * Top level application object
 *
 */
module example {

  declare var Stats;
  declare var viewContainer;

  import Container = PIXI.Container;
  import Sprite = PIXI.Sprite;
  import SystemRenderer = PIXI.SystemRenderer;
  import Constants = example.Constants;
  import GameController = example.GameController;

  export class Game {


    stage:Container;
    sprites:Container;
    renderer:SystemRenderer;
    controller:GameController;
    delta:number;
    previousTime:number;
    stats;

    /**
     * Load assets and start
     */
    public static main() {

      for (var asset in Constants.assets) {
        PIXI.loader.add(asset, Constants.assets[asset]);
      }
      PIXI.loader.load((loader, resources) => new Game(resources));
    }

    /**
     * Create the game instance
     * @param resources
     */
    constructor(resources) {

      var stats = this.stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.top = '0px';


      this.stage = new Container();
      viewContainer = this.sprites = new Container();
      var renderer = this.renderer = PIXI.autoDetectRenderer(Constants.FRAME_WIDTH, Constants.FRAME_HEIGHT, {backgroundColor:0xffffff});
      switch (Constants.SCALE_TYPE) {
        case ScaleType.FILL:
          this.renderer.view.style.position = 'absolute';
          break;
        case ScaleType.FIXED:
          renderer.view.style.position = 'absolute';
          renderer.view.style.width = window.innerWidth + 'px';
          renderer.view.style.height = window.innerHeight + 'px';
          renderer.view.style.display = 'block';
          break;
      }

      document.body.appendChild(renderer.view);
      document.body.appendChild(stats.domElement);

      window.addEventListener('resize', this.resize, true);
      window.onorientationchange = this.resize;
      this.stage.addChild(this.sprites);

      this.controller = new GameController();
      this.controller.start();
      requestAnimationFrame(this.update);

    }

    /**
     * Game Loop
     * @param time
     */
    update = (time:number) => {
      this.stats.begin();
      this.delta = this.previousTime || time;
      this.previousTime = time;
      if (this.controller) this.controller.update((time - this.delta) * 0.001);
      this.renderer.render(this.stage);
      this.stats.end();
      requestAnimationFrame(this.update);
    };

    /**
     * Resize window
     */
    resize = () => {
      switch (Constants.SCALE_TYPE) {
        case ScaleType.FILL:
          var height = window.innerHeight;
          var width = window.innerWidth;
          this.renderer.resize(width, height);
          break;
        case ScaleType.FIXED:
          this.renderer.view.style.width = window.innerWidth + 'px';
          this.renderer.view.style.height = window.innerHeight + 'px';
          break;
      }
    };

  }
}

