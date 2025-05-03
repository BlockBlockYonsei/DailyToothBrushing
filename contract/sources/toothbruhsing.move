/// Module: contract
module contract::toothbruhsing;


use sui::clock::Clock;

public struct ToothBruhsing has key {
  id: UID,
  timestamp: u64
}


entry fun brush_my_teeth(clock: &Clock, ctx: &mut TxContext) {
  let timestamp = clock.timestamp_ms();

  let tooth_brushing = ToothBruhsing {
    id: object::new(ctx),
    timestamp
  };

  transfer::transfer(tooth_brushing, ctx.sender());

}

