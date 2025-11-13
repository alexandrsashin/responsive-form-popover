import { useState, useRef, useEffect } from "react";
import { Button, Form, Input, Popover } from "antd";

const BOTTOM_MARGIN = 30;
const ARROW_HEIGHT = 16;
const POPOVER_PADDING = 12;

export default function ResponsiveFormPopover() {
  const [open, setOpen] = useState(false);
  const [contentMaxHeight, setContentMaxHeight] = useState<string>("60vh");
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const update = () => {
      const rect = buttonRef.current!.getBoundingClientRect();
      if (!rect) return;

      const available =
        document.documentElement.scrollHeight -
        (window.scrollY + rect.bottom) -
        BOTTOM_MARGIN -
        POPOVER_PADDING * 2 -
        ARROW_HEIGHT;

      setContentMaxHeight(`${available}px`);
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, [open]);

  const labelCol = { span: 8 };
  const wrapperCol = { span: 16 };
  const size = "large";

  const form = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: contentMaxHeight,
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
        <Form
          layout="vertical"
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          size={size}
          onFinish={() => setOpen(false)}
        >
          <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
            <Input placeholder="Иван" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item label="Телефон" name="phone">
            <Input placeholder="+7 (999) 999-99-99" />
          </Form.Item>
          <Form.Item label="Компания" name="company">
            <Input placeholder="ООО Ромашка" />
          </Form.Item>
          <Form.Item label="Должность" name="position">
            <Input placeholder="Менеджер" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item label="Телефон" name="phone">
            <Input placeholder="+7 (999) 999-99-99" />
          </Form.Item>
          <Form.Item label="Компания" name="company">
            <Input placeholder="ООО Ромашка" />
          </Form.Item>
          <Form.Item label="Должность" name="position">
            <Input placeholder="Менеджер" />
          </Form.Item>
        </Form>
      </div>
      <div
        style={{
          borderTop: "1px solid #f0f0f0",
          paddingTop: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={() => setOpen(false)}>
          Сохранить
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger="click"
      placement="bottomLeft"
      overlayStyle={{ width: "400px" }}
      destroyOnHidden
      content={form}
    >
      <Button ref={buttonRef}>Открыть форму</Button>
    </Popover>
  );
}
