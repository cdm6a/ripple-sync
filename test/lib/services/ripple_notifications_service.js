var rippleNotificationService = require(__dirname + '/../../../lib/services/ripple_notification_service.js');

describe('RippleNotificationsService', function() {

  it('should persist ripple payments', function(done) {
    this.timeout(0);
    return rippleNotificationService.test('http://localhost:5990/v1/accounts/rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn/notifications/18F40F7BDDA7484DD718F0AF76EA055701973C0F827E139A8535992C8CAF237F')
      .then(done).error(done);
  });
});