module example {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import ISetPool = entitas.ISetPool;

  export class AccelerateSystem implements IReactiveSystem, ISetPool {
    protected group:Group;

    public get trigger():TriggerOnEvent {
      return Matcher.Accelerating.onEntityAddedOrRemoved();
    }

    /**
     * Execute when acceleration is added or removed
     * @param entities
     */
    public execute(entities:Array<Entity>) {
      if (entities.length !== 1) {
        throw new Exception("Expected exactly one entity but found " + entities.length);
      }
      var accelerate = (<Entity>entities[0]).isAccelerating;
      var entities = this.group.getEntities();
      for (var i=0, l=entities.length; i<l; i++) {
        var e:Entity = <Entity>entities[i];
        var move = e.move;
        var speed = accelerate ? move.maxSpeed : 0;
        e.replaceMove(speed, move.maxSpeed);
      }
    }
    
    public setPool(pool:Pool) {
      this.group = pool.getGroup(Matcher.allOf(Matcher.Acceleratable, Matcher.Move));
    }
    


  }
}