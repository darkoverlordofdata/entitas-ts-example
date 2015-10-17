module example {

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  declare var viewContainer;

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import CoreMatcher = entitas.CoreMatcher;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;

  export class AddViewSystem implements IReactiveSystem {

    public get trigger():TriggerOnEvent {
      return CoreMatcher.Resource.onEntityAdded();
    }

    /**
     * Execute when a Resource is added
     * @param entities
     */
    public execute(entities:Array<Entity>) {
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];

        var sprite = prefab(Constants.resources[e.resource.name]);
        viewContainer.addChild(sprite);
        e.addView(sprite);
      }
    }
  }


  /**
   * Builds a prefab composite sprite
   *
   * @param config
   * @returns {PIXI.Sprite}
   */
  function prefab(config): PIXI.Sprite {

    if (Array.isArray(config)) {
      var container = new PIXI.Sprite();
      for (var i=0, l=config.length; i<l; i++) {
        container.addChild(prefab(config[i]));
      }
      return container;
    } else {
      var sprite = new PIXI.Sprite(Texture.fromFrame(config.path));
      for (var k in config) {
        switch(k) {
          case 'anchor':
            sprite.anchor.set(config.anchor.x, config.anchor.y);
            break;
          case 'scale':
            sprite.scale.set(config.scale.x, config.scale.y);
            break;
          case 'position':
            sprite.position.set(config.position.x, config.position.y);
            break;
          case 'rotation':
            sprite.rotation = config.rotation.z;
            break;
          case 'tint':
            sprite.tint = config.tint;
            break;
        }
      }
      return sprite;
    }
  }

}