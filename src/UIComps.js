import React from 'react';

export function MenuItem(props) {
  const { item, quantity, onIncrement, onDecrement } = props;

  return (
    <li className="menu-item">
      <div>
        <div className="menu-item-title">
          <h4>{item.label}</h4>
          <span>(${item.price})</span>
        </div>
        <p className="menu-item-description">{item.description}</p>
      </div>
      {quantity === 0 ? (
        <button
          aria-label={`Add ${item.label} to cart`}
          className="menu-btn-add"
          onClick={() => onIncrement(item.id)}
        >
          Add <IconPlus />
        </button>
      ) : (
        <div className="menu-btn-group">
          <button
            aria-label={`Remove ${item.label} from cart`}
            className="menu-btn-item"
            onClick={() => onDecrement(item.id)}
          >
            <IconMinus />
          </button>
          <div className="menu-item-qty" role="status" aria-live="polite">{quantity}</div>
          <button
            aria-label={`Add ${item.label} to cart`}
            className="menu-btn-item"
            onClick={() => onIncrement(item.id)}
          >
            <IconPlus />
          </button>
        </div>
      )}
    </li>
  );
}

// source- https://feathericons.com/
export function IconPlus() {
  return (
    <svg
      className="icon-plus"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

// source- https://feathericons.com/
export function IconMinus() {
  return (
    <svg
      className="icon-minus"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

export function Message(props) {
  const { status } = props;

  const messages = {
    loading: 'Loading...',
    failed: (
      <>
        Menu failed to load.
        <br />
        Please try again...
      </>
    ),
  };

  const messageText = messages[status];

  if (!messageText) {
    return null;
  }

  return (
    <div
      className={`message-${status}`}
      role={status === 'failed' ? 'alert' : 'status'}
      aria-live="polite"
      aria-busy={status === 'loading'}
    >
      {messageText}
    </div>
  );
}

export function PayButton(props) {
  const { cartPrice } = props;
  return (
    <a href="#payment" className="food-app-pay-btn" aria-live="polite">
      Pay for food (${cartPrice})
    </a>
  );
}
