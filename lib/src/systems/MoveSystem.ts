module example {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IExecuteSystem = entitas.IExecuteSystem;
  import ISetPool = entitas.ISetPool;

  export class MoveSystem implements IExecuteSystem, ISetPool {
    protected group:Group;

    /**
     * Execute motion each frame
     */
    public execute() {
      var entities = this.group.getEntities();
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];
        var move = e.move;
        var pos = e.position;
        e.replacePosition(pos.x, pos.y + move.speed*.5, pos.z);
      }
    }
    
    public setPool(pool:Pool) {
      this.group = pool.getGroup(Matcher.allOf(Matcher.Move, Matcher.Position));
    }
    


  }
}