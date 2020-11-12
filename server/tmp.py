
import hashlib

test_password = 'choi9097()(&'
after_password = test_password.encode('utf-8')

password_hash = hashlib.new('sha256')
password_hash.update(after_password)
tmp = password_hash.hexdigest()
print(tmp, type(tmp))
# 77af778b51abd4a3c51c5ddd97204a9c3ae614ebccb75a606c3b6865aed6744e