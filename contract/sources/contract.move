/// Module: contract
module contract::contract;


use sui::clock::Clock;
use sui::nitro_attestation::timestamp;

public struct ToothBrushing has key {
  id: UID,
  timestamp: u64
}


entry fun brush_my_teeth(clock: &Clock, ctx: &mut TxContext) {
  let timestamp = clock.timestamp_ms();

  let tooth_brushing = ToothBrushing {
    id: object::new(ctx),
    timestamp
  };

  transfer::transfer(tooth_brushing, ctx.sender());

}

