def is_uae_iban(value: str) -> bool:
    iban = "".join(value.split()).upper()
    if len(iban) != 23 or not iban.startswith("AE") or not iban[2:].isdigit():
        return False
    rearranged = f"{iban[4:]}{iban[:4]}"
    numeric = "".join(str(ord(character) - 55) if character.isalpha() else character for character in rearranged)
    remainder = 0
    for digit in numeric:
        remainder = (remainder * 10 + int(digit)) % 97
    return remainder == 1


def mask_iban(value: str) -> str:
    iban = "".join(value.split()).upper()
    if len(iban) < 8:
        return iban
    return f"{iban[:4]} •••• {iban[-4:]}"


def mask_email(value: str) -> str:
    local, _, domain = value.partition("@")
    if not domain:
        return "***"
    visible = local[:1]
    return f"{visible}***@{domain}"
