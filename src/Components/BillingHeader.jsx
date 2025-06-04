// BillingHeader Component
const BillingHeader = () => {
  return (
    <div className="grid grid-cols-6 gap-4 mb-4 text-sm font-medium text-gray-700">
      <div>Type</div>
      <div>Rate</div>
      <div>Quantity</div>
      <div>Status</div>
      <div>Amount</div>
      <div>Actions</div>
    </div>
  );
};

export default BillingHeader;