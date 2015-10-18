module example {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import IMatcher = entitas.IMatcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import IEnsureComponents = entitas.IEnsureComponents;

  export class RenderPositionSystem implements IReactiveSystem, IEnsureComponents {

    public get trigger():TriggerOnEvent {
      return (<Matcher>Matcher.allOf(Matcher.View, Matcher.Position)).onEntityAdded();
    }
    
    public execute(entities:Array<Entity>) {
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];
        var pos = e.position;
        e.view.sprite.position.set(pos.x, pos.y);
      }
    }
    
    public get ensureComponents():IMatcher {
      return Matcher.View;
    }
    


  }
}