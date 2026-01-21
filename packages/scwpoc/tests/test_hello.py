from scwpoc.hello import get_hello


def test_get_hello_returns_dict():
    result = get_hello()
    assert isinstance(result, dict)


def test_get_hello_has_message():
    result = get_hello()
    assert "message" in result
    assert isinstance(result["message"], str)


def test_get_hello_has_figlet():
    result = get_hello()
    assert "figlet" in result
    assert isinstance(result["figlet"], str)
    assert len(result["figlet"]) > 0
