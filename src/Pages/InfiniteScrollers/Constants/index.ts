
export const INFINITE_MOVING_CARDS_ATTRIBUTES = {
    direction_defined_anti: 'left',
    direction_defined_forth: 'right',
    speed_determining_constant_low: 'slow',
    speed_determining_constant_med: 'normal',
    speed_determining_constant_high: 'fast', 
} as const;

export type DirectionDeterminingConstants = typeof INFINITE_MOVING_CARDS_ATTRIBUTES.direction_defined_anti | typeof INFINITE_MOVING_CARDS_ATTRIBUTES.direction_defined_forth;
export type SpeedDeterminingConstants = typeof INFINITE_MOVING_CARDS_ATTRIBUTES.speed_determining_constant_low | typeof INFINITE_MOVING_CARDS_ATTRIBUTES.speed_determining_constant_med | typeof INFINITE_MOVING_CARDS_ATTRIBUTES.speed_determining_constant_high;
