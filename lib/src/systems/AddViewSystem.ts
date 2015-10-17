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
    
    public execute(entities:Array<Entity>) {
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];
        var prefab = Constants.resources[e.resource.name];

        var sprite = new Sprite(Texture.fromFrame(prefab.path));
        if (prefab.scale) {
          sprite.scale.set(prefab.scale.x, prefab.scale.y);
        }
        if (prefab.rotation) {
          sprite.rotation = prefab.rotation.z;
        }
        viewContainer.addChild(sprite);

        e.addView(sprite);
      }
    }
    


  }
}