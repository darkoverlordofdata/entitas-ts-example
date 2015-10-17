module example {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import CoreMatcher = entitas.CoreMatcher;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import ISetPool = entitas.ISetPool;

  export class ReachedFinishSystem implements IReactiveSystem, ISetPool {
    protected pool:Pool;

    public get trigger():TriggerOnEvent {
      return CoreMatcher.Position.onEntityAdded();
    }
    
    public execute(entities:Array<Entity>) {
      var finishLinePosY = this.pool.finishLineEntity.position.y*50;
      for (var i=0, l=entities.length; i<l; i++) {
        var e = entities[i];
        if (e.position.y > finishLinePosY) {
          e.isDestroy = true;
        }
      }
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }
  }
}